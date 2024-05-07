import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../configs/mydb.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    // 檢查用戶是否提供了電子郵件和密碼
    if (!email || !password) {
      console.log('Email or password not provided.')
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    // 查詢用戶
    const query =
      'SELECT user_id, email, password, firstname, lastname FROM users WHERE email = ?'
    const [results] = await db.execute(query, [email])

    // 如果找不到用戶，返回401錯誤
    if (results.length === 0) {
      console.log('User not found:', email)
      return res.status(401).json({ error: 'User not found.' })
    }

    const user = results[0]

    // 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password)

    // 如果密碼不匹配，返回401錯誤
    if (!isMatch) {
      console.log('Invalid credentials for user:', email)
      return res.status(401).json({ error: 'Invalid credentials.' })
    }

    const userName = `${user.firstname} ${user.lastname}`

    // 生成JWT令牌
    const tokenPayload = {
      user_id: user.user_id,
      name: userName,
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    // 設置Cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000,
    })

    // 登入成功
    console.log('Credentials valid for user:', userName)
    res
      .status(200)
      .json({ message: 'Authentication successful.', user: userName })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Error on the server.' })
  }
})

export default router
