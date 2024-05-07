import express from 'express'
import mydb from '../configs/mydb.js'
import authenticate from '##/middlewares/Myauthenticate.js'

const router = express.Router()

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

// router.get('/orders/:uid', authenticate, async (req, res) => {
//   const uid = Number(req.params.uid)
//   console.log('資料', uid)

//   if (isNaN(uid)) {
//     res.status(400).send({ message: 'Invalid ID' })
//     return
//   }

//   //資料庫
//   try {
//     const [results] = await mydb.execute(
//       `SELECT
//       \`order\`.*,
//       DATE_FORMAT(\`order\`.created_at, '%Y-%m-%d %H:%i:%s') AS order_created_at,
//       DATE_FORMAT(\`order\`.updated_at, '%Y-%m-%d %H:%i:%s') AS order_updated_at,
//       \`order\`.id AS order_id,
//       order_item.product_id AS order_item_id,
//       order_item.quantity AS order_item_quantity,
//       product.*,
//       order_info.*,
//       mycoupon.coupon_name AS coupon_name,
//       mycoupon.discount_title AS coupon_discount_title,
//       CASE
//         WHEN \`order\`.payment_status = 'pending' THEN '未付款成功'
//         WHEN \`order\`.payment_status = 'paid' THEN '付款成功'
//       END AS payment_status,
//       CASE
//         WHEN \`order\`.shipping = 'FAMIC2C' THEN '全家超商'
//         WHEN \`order\`.shipping = 'UNIMARTC2C' THEN '7-11超商'
//         WHEN \`order\`.shipping = 'OKMARTC2C' THEN 'OK超商'
//         WHEN \`order\`.shipping = '宅配' THEN '黑貓宅急便'
//       END AS shipping
//     FROM
//       \`order\`
//       JOIN order_item ON \`order\`.\`id\` = order_item.order_id
//       JOIN product ON order_item.product_id = product.id
//       JOIN order_info ON \`order\`.order_info_id = order_info.id
//       LEFT JOIN mycoupon ON \`order\`.\`coupon_id\` = mycoupon.id
//     WHERE
//       \`order\`.user_id = ?
//       ORDER BY \`order\`.created_at DESC;
//   `,
//       [uid]
//     )
//     console.log(results)

//     const ordersMap = new Map()

//     results.forEach((row) => {
//       // 檢查Map中是否已存在此訂單
//       if (!ordersMap.has(row.order_id)) {
//         // 如果不存在，則創建一個新的訂單對象，並添加到Map中
//         ordersMap.set(row.order_id, {
//           ...row,
//           order_items: [], // 初始化訂單項目陣列
//         })
//       }

//       // 將當前行的訂單項目添加到訂單對象的訂單項目陣列中

//       ordersMap.get(row.order_id).order_items.push({
//         order_item_id: row.order_item_id,
//         order_item_quantity: row.order_item_quantity,
//         name: row.name,
//         product_type: row.product_type,
//         price: row.price,
//         description: row.description,
//         image: row.image,

//         // 其他訂單項目相關欄位
//       })
//     })

//     // 將Map轉換為陣列
//     const orders = Array.from(ordersMap.values())
//     const { dataSend } = orders

//     if (orders.length > 0) {
//       res.json({ status: 'success', data: orders })
//       console.log(orders)
//     } else {
//       res.status(404).json({ status: 'fail', message: 'Order not found' })
//     }
//   } catch (error) {
//     console.error('Error fetching orders:', error)
//     res.status(500).json({ message: 'Error processing request' })
//   }
// })

router.get('/orders', authenticate, async (req, res) => {
  const uid = req.user.user_id
  console.log('資料', uid)

  if (isNaN(uid)) {
    res.status(400).send({ message: 'Invalid ID' })
    return
  }

  //資料庫
  try {
    const [results] = await mydb.execute(
      `SELECT
      \`order\`.*,
      DATE_FORMAT(\`order\`.created_at, '%Y-%m-%d %H:%i:%s') AS order_created_at,
      DATE_FORMAT(\`order\`.updated_at, '%Y-%m-%d %H:%i:%s') AS order_updated_at,
      \`order\`.id AS order_id,
      order_item.product_id AS order_item_id,
      order_item.quantity AS order_item_quantity,
      product.*,
      order_info.*,
      mycoupon.coupon_name AS coupon_name,
      mycoupon.discount_title AS coupon_discount_title,
      CASE
        WHEN \`order\`.payment_status = 'pending' THEN '未付款成功'
        WHEN \`order\`.payment_status = 'paid' THEN '付款成功'
      END AS payment_status,
      CASE
        WHEN \`order\`.shipping = 'FAMIC2C' THEN '全家超商'
        WHEN \`order\`.shipping = 'UNIMARTC2C' THEN '7-11超商'
        WHEN \`order\`.shipping = 'OKMARTC2C' THEN 'OK超商'
        WHEN \`order\`.shipping = '宅配' THEN '黑貓宅急便'
      END AS shipping
    FROM
      \`order\`
      JOIN order_item ON \`order\`.\`id\` = order_item.order_id
      JOIN product ON order_item.product_id = product.id
      JOIN order_info ON \`order\`.order_info_id = order_info.id
      LEFT JOIN mycoupon ON \`order\`.\`coupon_id\` = mycoupon.id
    WHERE
      \`order\`.user_id = ?
      ORDER BY \`order\`.created_at DESC;
  `,
      [uid]
    )
    console.log(results)

    const ordersMap = new Map()

    results.forEach((row) => {
      // 檢查Map中是否已存在此訂單
      if (!ordersMap.has(row.order_id)) {
        // 如果不存在，則創建一個新的訂單對象，並添加到Map中
        ordersMap.set(row.order_id, {
          ...row,
          order_items: [], // 初始化訂單項目陣列
        })
      }

      // 將當前行的訂單項目添加到訂單對象的訂單項目陣列中

      ordersMap.get(row.order_id).order_items.push({
        order_item_id: row.order_item_id,
        order_item_quantity: row.order_item_quantity,
        name: row.name,
        product_type: row.product_type,
        price: row.price,
        description: row.description,
        image: row.image,

        // 其他訂單項目相關欄位
      })
    })

    // 將Map轉換為陣列
    const orders = Array.from(ordersMap.values())
    const { dataSend } = orders

    if (orders.length > 0) {
      res.json({ status: 'success', data: orders })
      console.log(orders)
    } else {
      res.status(404).json({ status: 'fail', message: 'Order not found' })
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ message: 'Error processing request' })
  }
})

export default router
