import express from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import mydb from '../configs/mydb.js'

const router = express.Router()

// Google OAuth 相关配置
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/userinfo'
const JWT_SECRET = process.env.JWT_SECRET

router.get('/', async (req, res) => {
  const code = req.query.code
  if (!code) {
    return res.status(400).send('授权码缺失。')
  }

  try {
    // 使用授权码换取 access token
    const tokenResponse = await axios.post(
      GOOGLE_TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: GOOGLE_REDIRECT_URI,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const accessToken = tokenResponse.data.access_token

    // 使用 access token 获取用户信息
    const profileResponse = await axios.get(GOOGLE_USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const { sub: googleId, name, email } = profileResponse.data

    // 将用户信息插入或更新至数据库
    await mydb.query(
      'INSERT INTO users (google_id, firstname, email, auth_provider) VALUES (?, ?, ?, "google") ON DUPLICATE KEY UPDATE firstname = ?, email = ?',
      [googleId, name, email, name, email]
    )

    // 取得用户 ID
    const [rows] = await mydb.query(
      'SELECT user_id FROM users WHERE google_id = ?',
      [googleId]
    )
    const user_id = rows[0].user_id

    // 构建 JWT 载荷
    const tokenPayload = {
      google_id: googleId,
      user_id: user_id, // 包括 user_id
      firstname: name,
      email: email,
    }

    // 签发 JWT
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: '1h',
    })

    // 将 JWT 设置到 HttpOnly cookie 中
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true, // 注意: 生产环境中应确保您的服务运行在 HTTPS 上
      maxAge: 3600000, // 1小时
    })

    // 重定向到前端的某个路由
    res.redirect(`http://localhost:3000/member/profile?login=success`)
  } catch (error) {
    console.error('Google 登录过程出错:', error)
    res.status(500).send('内部服务器错误')
  }
})

export default router
