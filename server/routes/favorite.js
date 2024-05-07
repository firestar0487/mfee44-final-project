import express from 'express'
import mydb from '##/configs/mydb.js'
import authenticate from '../middlewares/Myauthenticate.js'
const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id

    const [favorites] = await mydb.execute(
      'SELECT product_id FROM favorite WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    )
    const productIds = favorites.map((favorite) => favorite.product_id)

    if (productIds.length === 0) {
      return res.send({ favorites: [], products: [] })
    }

    const placeholders = productIds.map(() => '?').join(',')

    const [products] = await mydb.execute(
      `SELECT p.id, p.name, p.image, p.price FROM product p WHERE p.id IN (${placeholders})`,
      productIds
    )

    res.send({ favorites, products })
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

export default router
