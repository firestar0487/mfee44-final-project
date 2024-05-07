import mydb from '##/configs/mydb.js'; // 資料庫
import express from 'express'; // 伺服器
const router = express.Router(); // 建立 Router 物件

// http://localhost:3005/api/service，此頁功能是依據條件查詢分店
router.get('/', async (req, res) => {
    try {
        // 從 req.query 中獲取查詢參數
        const { area, openTime, closeTime, textSearch } = req.query;//物件解構附值

        // 構建 SQL 查詢語句
        let sql = 'SELECT * FROM stores WHERE 1 = 1'; // 初始 SQL 語句，1 = 1 是為了方便後續條件拼接

        // 根據參數拼接 SQL 語句
        if (area) {
            sql += ` AND area IN ('${area.split(',').join("','")}')`;
        }
        if (openTime) {
            sql += ` AND open_time >= '${openTime}'`;
        }
        if (closeTime) {
            sql += ` AND close_time <= '${closeTime}'`;
        }
        if (textSearch) {
            sql += ` AND (store_name LIKE '%${textSearch}%' OR address LIKE '%${textSearch}%')`;
        }

        // 執行 SQL 查詢
        const [rows, fields] = await mydb.execute(sql);

        // 回傳查詢結果
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// http://localhost:3005/api/service/support，此頁功能是送出一筆資料給後端，後端發送email給user
router.post('/support', (req, res) => {
    // 在這裡處理後續邏輯
});

export default router;
