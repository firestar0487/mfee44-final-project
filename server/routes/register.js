// register.js
import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import db from '../configs/mydb.js' // 確保路徑正確
import jwt from 'jsonwebtoken'

const router = express.Router()

// 註冊用戶的路由處理
router.post('/', async (req, res) => {
  const {
    email,
    password,
    title,
    lastname,
    firstname,
    auth_provider = 'local',
  } = req.body

  try {
    // 對密碼進行加密
    const hashedPassword = await bcrypt.hash(password, 10)
    // 生成驗證碼
    const verificationCode = Array.from({ length: 6 }, () =>
      crypto.randomInt(0, 10)
    ).join('')

    // 準備 SQL 插入語句
    const sqlInsert = `
      INSERT INTO users (
        email, password, title, lastname, firstname, auth_provider, email_verified, verification_code
      ) VALUES (?, ?, ?, ?, ?, ?, false, ?)`

    // 等待數據庫插入操作完成
    const [result] = await db.query(sqlInsert, [
      email,
      hashedPassword,
      title,
      lastname,
      firstname,
      auth_provider,
      verificationCode,
    ])

    // 創建 JWT token
    const payload = { email, user_id: result.insertId }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    // 在這裡設置 HTTP Only Cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000,
    })

    // 設定郵件發送器
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
      },
    })

    // 配置郵件選項
    const mailOptions = {
      from: `"墨韻雅筆" <${process.env.SMTP_TO_EMAIL}>`,
      to: email,
      subject: '墨韻雅筆 個人帳號認證信',
      html: `
      <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
        <h2>感謝閣下在墨韻雅筆官方網站註冊</h2>
        <p>登入您的個人帳號便可尊享以下服務：</p>
        <ul>
          <li>管理您的個人資料</li>
          <li>訂閱墨韻雅筆最新電子通訊</li>
          <li>儲存您的願望錄</li>
        </ul>
        <p>請輸入以下啟用帳號金鑰以完成建立您的墨韻雅筆個人帳號：</p>
        <p style="background-color: #f0f0f0; padding: 10px; font-weight: bold;">${verificationCode}</p>
      </div>`,
    }

    // 等待發送郵件
    await transporter.sendMail(mailOptions)
    // 回應用戶註冊成功
    res.status(200).json({ message: '用戶註冊成功。驗證郵件已發送。' })
  } catch (err) {
    // 錯誤處理
    console.error('錯誤：', err)
    res.status(500).json({ message: '註冊過程中發生錯誤。' })
  }
})

export default router
