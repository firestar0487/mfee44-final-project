import express from 'express'
import authenticate from '../middlewares/Myauthenticate.js' // 导入你的认证中间件

const router = express.Router()

// 使用 authenticate 中間件 JWT
router.post('/', authenticate, (req, res) => {
  // 由于 authenticate 中间件已经处理了错误情况
  // 到这里的请求都是 token 验证通过的
  return res.status(200).json({
    status: 'success',
    message: 'Token is valid.',
    user: req.user, // 这里假设 authenticate 中间件会将解码后的用户信息放到 req.user
  })
})

export default router
