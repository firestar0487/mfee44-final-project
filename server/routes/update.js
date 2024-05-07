import express from 'express'
import jwt from 'jsonwebtoken'
import db from '../configs/mydb.js'

const router = express.Router()

// GET 請求保持不變，用於獲取用戶資訊
router.get('/', async (req, res) => {
  // 您現有的 GET 請求處理邏輯
})

// PUT 請求單獨處理，用於更新用戶資料
router.put('/', async (req, res) => {
  const token = req.cookies.authToken // 從 Cookie 中獲取令牌
  if (!token) {
    return res.status(401).json({ message: '缺少令牌' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.user_id
    const { title, firstname, lastname, phone, birthdate } = req.body

    // 檢查用戶是否已設定生日
    const checkQuery = 'SELECT birthdate FROM users WHERE user_id = ?'
    const [checkResults] = await db.query(checkQuery, [userId])
    // 只有在生日尚未設定且前端提供了生日信息時才進行更新
    let birthdateUpdatePart = ''
    if (checkResults[0] && !checkResults[0].birthdate && birthdate) {
      birthdateUpdatePart = `, birthdate = '${birthdate}'`
    }

    const updateQuery = `UPDATE users SET title = ?, firstname = ?, lastname = ?, phone = ? ${birthdateUpdatePart} WHERE user_id = ?`
    await db.query(updateQuery, [title, firstname, lastname, phone, userId])

    res.json({ message: '用戶資料已更新' })
  } catch (error) {
    console.error('錯誤:', error)
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: '無效的令牌' })
    } else {
      res.status(500).json({ message: '內部服務器錯誤' })
    }
  }
})

export default router
