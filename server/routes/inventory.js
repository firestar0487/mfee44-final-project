import mydb from '##/configs/mydb.js'; // 資料庫
import express from 'express'; // 伺服器
const router = express.Router(); // 建立 Router 物件


//http://localhost:3005/api/inventory/${pid}
router.get('/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const query = `SELECT store_id, qty FROM stock WHERE product_id = ${productId}`;
      const [rows] = await mydb.query(query, [productId]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  export default router;