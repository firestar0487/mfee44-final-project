import express from 'express'
import mydb from '##/configs/mydb.js'
import authenticate from '../middlewares/Myauthenticate.js'
const router = express.Router()

router.delete('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id
    const pid = req.body.pid // 从请求体中获取要移除的产品ID

    const sql = `DELETE FROM favorite WHERE user_id = ? AND product_id = ?`
    await mydb.execute(sql, [userId, pid])

    res
      .status(200)
      .json({ status: 'success', message: '成功移除收藏夹中的商品' })
  } catch (err) {
    console.error('移除收藏夹中的商品时发生错误:', err)
    return res
      .status(500)
      .json({ status: 'error', message: '移除收藏夹中的商品时发生错误' })
  }
})

export default router
