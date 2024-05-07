import express from 'express'
import db from '../configs/mydb.js' // 確保路徑正確

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, code } = req.body

  try {
    // 這裡的 await 語句等待 db.query 解決，這是一個基於 Promise 的操作。
    const [results] = await db.query(
      'SELECT verification_code FROM users WHERE email = ?',
      [email]
    )
    if (results.length === 0 || code !== results[0].verification_code) {
      return res.status(400).json({ message: '無效的驗證碼' })
    }

    // 再次使用 await 來等待另一個基於 Promise 的操作。
    await db.query('UPDATE users SET email_verified = true WHERE email = ?', [
      email,
    ])
    res.status(200).json({ message: '電子郵件驗證成功。' })
  } catch (err) {
    // 這裡捕捉到任何在上述異步操作中拋出的錯誤。
    console.error('錯誤：', err)
    res.status(500).json({ message: err.message })
  }
})

// 導出 router 以在其他地方使用
export default router
