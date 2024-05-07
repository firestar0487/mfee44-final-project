import express from 'express'
import db from '../configs/mydb.js'
import { format } from 'date-fns-tz'
import authenticate from '../middlewares/Myauthenticate.js'

const router = express.Router()

// 應用認證中間件
router.use(authenticate)

// 定義路由處理函數
router.get('/', async (req, res) => {
  try {
    // 檢查用戶是否通過認證
    if (!req.user) {
      console.error('未認證的請求: req.user 為空')
      return res.status(401).json({ message: '未認證的請求' })
    }

    console.log('已認證的用戶: ', req.user)

    let userData
    if (req.user.line_id) {
      // 如果是 Line 登錄用戶，獲取 Line 用戶數據
      console.log('獲取 Line 用戶數據: ', req.user.line_id)
      userData = await getUserDataFromLine(req.user.line_id)
    } else {
      // 否則，獲取其他登錄方式的用戶數據
      console.log('獲取其他登錄方式的用戶數據: ', req.user.user_id)
      userData = await getUserDataFromOther(req.user.user_id)
    }

    res.json(userData)
  } catch (error) {
    console.error('處理用戶數據請求時出現錯誤: ', error)
    res.status(500).json({ message: '服務器內部錯誤' })
  }
})

// 定義獲取 Line 用戶數據的函數
async function getUserDataFromLine(lineId) {
  try {
    const query =
      'SELECT user_id, email, title, lastname, firstname, phone, birthdate FROM users WHERE line_id = ?'
    const [results] = await db.query(query, [lineId])

    if (results.length === 0) {
      throw new Error(`找不到 Line 用戶: ${lineId}`)
    }

    const user = results[0]
    formatBirthdate(user)
    return user
  } catch (error) {
    console.error(`獲取 Line 用戶數據失敗: ${lineId}`, error)
    throw error
  }
}

// 定義獲取其他登錄方式用戶數據的函數
async function getUserDataFromOther(userId) {
  try {
    const query =
      'SELECT user_id, email, title, lastname, firstname, phone, birthdate FROM users WHERE user_id = ?'
    const [results] = await db.query(query, [userId])

    if (results.length === 0) {
      throw new Error(`找不到其他登錄方式的用戶: ${userId}`)
    }

    const user = results[0]
    formatBirthdate(user)
    return user
  } catch (error) {
    console.error(`獲取其他登錄方式的用戶數據失敗: ${userId}`, error)
    throw error
  }
}

// 定義格式化生日的函數
function formatBirthdate(user) {
  if (user.birthdate) {
    const utcBirthdate = new Date(user.birthdate)
    const userTimezone = 'Asia/Taipei'
    const formattedBirthdate = format(utcBirthdate, 'yyyy-MM-dd', {
      timeZone: userTimezone,
    })
    user.birthdate = formattedBirthdate
  }
}

export default router
