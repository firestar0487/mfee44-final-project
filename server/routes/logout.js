import express from 'express'
import cookieParser from 'cookie-parser'

const router = express.Router()

// 使用 cookie-parser 中間件來解析 HTTP 請求中的 cookie
router.use(cookieParser())

// 創建處理登出請求的路由
router.post('/', (req, res) => {
// 清除名為 'authToken' 的 HttpOnly cookie
// 確保設置此 cookie 的選項與設置 token 時的選項一致，尤其是 path 和 domain
res.clearCookie('authToken', { path: '/' })
return res.status(200).json({ message: '您已成功登出。' })
})

export default router







