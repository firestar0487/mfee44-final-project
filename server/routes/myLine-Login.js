import express from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import mydb from '../configs/mydb.js'

const router = express.Router()

const CHANNEL_ID = process.env.LINE_CHANNEL_ID
const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET
const REDIRECT_URI = process.env.LINE_LOGIN_CALLBACK_URL
const LINE_TOKEN_ENDPOINT = 'https://api.line.me/oauth2/v2.1/token'
const LINE_PROFILE_ENDPOINT = 'https://api.line.me/v2/profile'
const JWT_SECRET = process.env.JWT_SECRET

router.get('/', async (req, res) => {
  const code = req.query.code
  if (!code) {
    return res.status(400).send('授權碼缺失。')
  }

  try {
    // 取得 LINE 授權碼換取存取權杖
    const tokenResponse = await axios.post(
      LINE_TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CHANNEL_ID,
        client_secret: CHANNEL_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const accessToken = tokenResponse.data.access_token

    // 使用存取權杖取得用戶資訊
    const profileResponse = await axios.get(LINE_PROFILE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const { userId, displayName } = profileResponse.data

    // 將用戶資訊插入或更新至資料庫
    await mydb.query(
      'INSERT INTO users (line_id, firstname, auth_provider) VALUES (?, ?, "line") ON DUPLICATE KEY UPDATE firstname = ?',
      [userId, displayName, displayName]
    )

    // 取得用戶 ID
    const [rows] = await mydb.query(
      'SELECT user_id FROM users WHERE line_id = ?',
      [userId]
    )
    const user_id = rows[0].user_id

    // 構建 JWT 負載
    const tokenPayload = {
      line_id: userId,
      user_id: user_id, // 包括 user_id
      firstname: displayName,
    }

    // 簽發 JWT
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: '1h',
    })

    // 將 JWT 設置到 HttpOnly cookie 中
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    })

    // 重定向到前端的某個路由
    res.redirect(`http://localhost:3000/member/profile?login=success`)
  } catch (error) {
    console.error('LINE 登入過程出錯:', error)
    res.status(500).send('內部伺服器錯誤')
  }
})

export default router
