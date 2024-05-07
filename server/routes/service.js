import mydb from '##/configs/mydb.js' // 資料庫
import express from 'express' // 伺服器
import nodemailer from 'nodemailer'
const router = express.Router() // 建立 Router 物件

// http://localhost:3005/api/service，此頁功能是依據條件查詢分店
router.get('/', async (req, res) => {
  try {
    // 从 req.query 中获取查询参数
    const { area, openTime, closeTime, textSearch } = req.query

    // 构建 SQL 查询语句
    let sql = 'SELECT * FROM stores WHERE 1 = 1' // 初始 SQL 语句，1 = 1 是为了方便后续条件拼接

    // 根据参数拼接 SQL 查询语句
    if (area && area.trim() !== '') {
      sql += ` AND area IN ('${area.split(',').join("','")}')`
    }
    if (openTime && openTime.trim() !== '') {
      sql += ` AND opentime <= '${openTime}'`
    }
    if (closeTime && closeTime.trim() !== '') {
      sql += ` AND closetime >= '${closeTime}'`
    }
    if (textSearch && textSearch.trim() !== '') {
      sql += ` AND (name LIKE '%${textSearch}%' OR address LIKE '%${textSearch}%')`
    }

    // 如果没有查询参数，则直接返回空数组
    if (!(area || openTime || closeTime || textSearch)) {
      return res.json([])
    }

    // 执行 SQL 查询
    const [rows, fields] = await mydb.execute(sql)

    // 返回查询结果
    res.json(rows)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// http://localhost:3005/api/service/support，此功能是用戶預約的路由處理，後端發送email給user
router.post('/support', async (req, res) => {
  const { userName, userPhone, userEmail, reservationDate,serviceType } = req.body

  try {
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
      to: userEmail,
      subject: '墨韻雅筆 預約服務通知',
      text: `你好，親愛的用戶${userName},在此通知您已預約成功。\n日期:${reservationDate}\n服務項目:${serviceType}\n屆時專員會再與您聯繫,感謝您的預約。\n墨韻雅筆營運團隊 敬上`,
    }
    // 等待發送郵件
    await transporter.sendMail(mailOptions)
    // 回應用戶註冊成功
    res.status(200).json({ message: '用戶預約成功。通知郵件已發送。'})
  } catch (err) {
    // 錯誤處理
    console.error('錯誤：', err)
    res.status(500).json({ message: '預約過程中發生錯誤。' })
  }
})

export default router
