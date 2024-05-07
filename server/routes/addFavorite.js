import express from 'express'
import mydb from '##/configs/mydb.js'
import authenticate from '../middlewares/Myauthenticate.js'

const router = express.Router()

router.post('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id
    const pid = req.body.pid // 从请求体中获取要添加到收藏夹的产品ID

    const sql = `INSERT INTO favorite (user_id, product_id, created_at) VALUES (?, ?, NOW())`
    await mydb.execute(sql, [userId, pid])

    res.status(200).json({ status: 'success', message: '成功添加到收藏夹' })
  } catch (err) {
    console.error('添加到收藏夹时发生错误:', err)
    return res
      .status(500)
      .json({ status: 'error', message: '添加到收藏夹时发生错误' })
  }
})

export default router
