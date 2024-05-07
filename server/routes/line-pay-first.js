import express, { query } from 'express'
import moment from 'moment'
import mydb from '../configs/mydb.js'

// 引入認證中間件
import authenticate from '../middlewares/Myauthenticate.js'

// line pay使用npm套件 串接流程簡化成只要呼叫 SDK 的 API 就可以完成
import { createLinePayClient } from 'line-pay-merchant'

//綠界物流 sdk
import ecpay_logistics from 'ecpay_logistics_nodejs/index.js'

// 產生uuid用
import { v4 as uuidv4 } from 'uuid'

//產生當下時間 格式：YYYY/MM/DD HH:mm:ss
function getCurrentTransactionTime() {
  return moment().format('YYYY/MM/DD HH:mm:ss')
}

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串 (重要)
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

const HOST = process.env.HOST

const router = express.Router()

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

// (1) 建立訂單路由
router.post('/creatOrder', authenticate, async (req, res) => {
  // 初始化 connection 變量，確保它在 try、catch 和 finally 塊中都可訪問
  let connection

  // 會員id由authenticate中介軟體提供
  const userId = req.user.user_id

  //假設前端丟過來的checkout資料
  const clientOrder = req.body

  // 驗證購物車資料是否存在
  if (!clientOrder.cart || clientOrder.cart.length === 0) {
    return res.status(400).json({ status: 'error', message: '購物車是空的' })
  }

  //要生成給資料庫的資料 進行formData解構
  let {
    shipping,

    // 宅配＆與c2c共用資料
    firstName,
    lastName,
    email,
    mobilePhone,
    // 宅配
    country,
    township,
    postcode,
    address,
    //c2c
    storeID,
    storeName,
    storeAddress,
    // 發票
    invoiceType,
    mobileBarcode,
    payType,
    coupon_id,
  } = clientOrder.formData

  if (!coupon_id) {
    coupon_id = null
  }

  //進行cart解構
  const cart = clientOrder.cart
  console.log(cart)

  //產生 orderId與packageId
  const orderId = uuidv4()
  const packageId = uuidv4()

  // 要傳送給line pay的訂單資訊 (完成)
  const order = {
    orderId: orderId,
    currency: 'TWD',
    amount: req.body.amount,
    packages: [
      {
        id: packageId,
        amount: req.body.amount,
        products: req.body.products,
      },
    ],
    options: { display: { locale: 'zh_TW' } },
  }

  // 要儲存到資料庫的order與line_pay資料 （成功）
  try {
    connection = await mydb.getConnection()
    //若資料有錯誤 會回滾所有資料避免部分資料寫入
    await connection.beginTransaction()

    //先寫入到 `order_info`
    //判斷是宅配還是c2c
    let query = ''
    let queryParams = []
    if (shipping === '宅配') {
      query =
        'INSERT INTO `order_info` (firstname,lastname,email,mobilephone,country,township,postcode,address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      queryParams = [
        firstName,
        lastName,
        email,
        mobilePhone,
        country,
        township,
        postcode,
        address,
      ]
    } else {
      query =
        'INSERT INTO `order_info` (firstname,lastname,email,mobilephone,store_id,store_name,store_address) VALUES (?, ?, ?, ?, ?, ?, ?)'
      queryParams = [
        firstName,
        lastName,
        email,
        mobilePhone,
        storeID,
        storeName,
        storeAddress,
      ]
    }
    const [orderInfoResult] = await connection.execute(query, queryParams)
    // 取出order_info的id
    const orderInfoId = orderInfoResult.insertId

    // 寫入到`order`表

    await connection.execute(
      'INSERT INTO `order` (id, user_id, amount,payment_status, order_info_id,coupon_id,payment,shipping) VALUES (?, ?, ?,?, ?, ?,?,?)',
      [
        orderId,
        userId,
        req.body.amount,
        'pending',
        orderInfoId,
        coupon_id,
        payType,
        shipping,
      ] // 假設初始狀態為'pending'
    )

    // 寫入到`order_item`表
    //await Promise.all 搭配map使用,確保所有order_item資料完成才進行後面執行
    await Promise.all(
      cart.map(async (v) => {
        await connection.execute(
          'INSERT INTO `order_item` (	order_id,product_id,quantity,item_price) VALUES (?,?,?,?)',
          [orderId, v.id, v.qty, v.price]
        )
      })
    )

    // 寫入到`line_pay`表
    await connection.execute(
      'INSERT INTO `line_pay` ( order_id, order_info) VALUES (?,?)',
      [orderId, JSON.stringify(order)]
    )

    await connection.commit() // 成功：提交事務  將order和line_pay數據

    // 回傳成功訊息與訂單資訊給前端
    res.json({ status: 'success', data: { order } })
  } catch (error) {
    if (connection) {
      await connection.rollback() //失敗：提交事務回滾 order與line_pay表所有寫入資料被取消
    }
    console.error('處理訂單時出現錯誤:', error)
    res.status(500).json({ status: 'error', message: '處理訂單時出現錯誤' })
  } finally {
    if (connection) {
      connection.release()
    }
  }
})

// (2) 導向line pay的路由 需要訂單的orderId
// 重新導向到line-pay，進行交易(純導向不回應前端)
router.get('/reserve', async (req, res) => {
  console.log(req.query.orderId)

  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId

  // 設定重新導向與失敗導向的網址 （重要）
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // 從ｌｉｎｅ_ｐａｙ資料庫取得訂單資料
  let orderRecord
  try {
    const [results] = await mydb.execute(
      'SELECT * FROM `line_pay` WHERE `order_id`=?',
      [orderId]
    )
    orderRecord = results[0]
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }

  if (!orderRecord) {
    console.log('查無此訂單ID')
    return res.json({ status: 'error', message: '查無此訂單ID' })
  }

  // order_info記錄要向line pay要求的訂單json
  const order = JSON.parse(orderRecord.order_info)

  //const order = cache.get(orderId)
  console.log(`獲得訂單資料，內容如下：`)
  console.log(order)

  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 在db儲存reservation資料
    try {
      const [result] = await mydb.execute(
        `UPDATE line_pay SET reservation = ?, transaction_id = ? WHERE order_id = ?`,
        [JSON.stringify(reservation), reservation.transactionId, orderId]
      )
      // result物件包含了此次更新操作的信息，如受影響的行數
      // console.log(result)

      if (result.affectedRows > 0) {
        console.log('更新成功')
      } else {
        console.log('沒有找到匹配的資料進行更新')
      }

      // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
      //postman測試中 173可能會刪掉
      // if (linePayResponse) {
      //   console.log('請求linpay付款成功')
      //   return res.json({
      //     status: 'success',
      //     message: linePayResponse.body.info.paymentUrl.web,
      //   })
      // }
      // console.log(linePayResponse.body.info.paymentUrl.web)

      res.redirect(linePayResponse.body.info.paymentUrl.web)
    } catch (err) {
      console.error('更新資料時出現錯誤:', err)
    }
  } catch (err) {
    console.error('查詢資料錯誤:', err)
  }
})

//(3)向linepay'確認交易結果'的路由
router.get('/confirm', async (req, res) => {
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId

  // 從資料庫取得交易資料
  let dbLinePay
  try {
    const [results] = await mydb.execute(
      'SELECT * FROM `line_pay` WHERE `transaction_id`=?',
      [transactionId]
    )
    dbLinePay = results[0]
    if (!dbLinePay) {
      return res.json({ status: 'error', message: '無法確認此交易訂單ＩＤ' })
    }

    console.log(dbLinePay)
  } catch (err) {
    console.error('查詢資料錯誤', err)
  }

  // 交易資料
  const transaction = JSON.parse(dbLinePay.reservation)
  console.log(transaction)

  // 交易金額
  const amount = transaction.amount

  try {
    // 最後確認交易
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })

    // linePayResponse.body回傳的資料
    console.log(linePayResponse)

    //transaction.confirmBody = linePayResponse.body

    // status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    let status = 'paid'

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }

    // 更新line_pay資料庫的訂單狀態
    let connection
    try {
      connection = await mydb.getConnection()

      await connection.beginTransaction()

      await connection.execute(
        `UPDATE \`order\` SET payment_status =?  WHERE id = ?`,
        [status, dbLinePay.order_id]
      )

      await connection.execute(
        `UPDATE line_pay SET return_code = ?, \`confirm\`=? WHERE order_id = ?`,
        [
          linePayResponse.body.returnCode,
          JSON.stringify(linePayResponse.body),
          dbLinePay.order_id,
        ]
      )

      // console.log('更新訂單狀態成功', result)
      await connection.commit()
      console.log('資料更新完畢')
    } catch (err) {
      console.error('更新訂單狀態資料失敗', err)
    } finally {
      if (connection) await connection.release()
    }

    /* 若linepay支付成功 更新優惠卷訂單 */
    // 更新優惠卷
    const [resultCoupon] = await mydb.execute(
      `SELECT * FROM \`order\`  WHERE id = ?`,
      [dbLinePay.order_id]
    )
    const { user_id, coupon_id } = resultCoupon[0]

    if (coupon_id) {
      const [updateCouppon] = await mydb.execute(
        `UPDATE \`member_coupon\` SET used_valid = '0' WHERE user_id = ? AND coupon_id = ?`,
        [user_id, coupon_id]
      )

      console.log('優惠卷更新成功:', updateCouppon)
    }
    /* 若linepay支付成功 建立綠界物流訂單 */
    // 用來將ecpay物流傳到前端的容器
    let ecPay = {}
    if (status === 'paid') {
      //透過order_id找到order_info資料
      const [results] = await connection.execute(
        'SELECT order_info.*,order.shipping,order.amount FROM order_info JOIN `order` ON order_info.id = `order`.`order_info_id` WHERE `order`.id = ?',
        [dbLinePay.order_id]
      )
      let ecPayData = results[0]
      console.log(ecPayData)

      //建立廠商訂單編號
      const uuid = uuidv4().replace(/-/g, '')
      const uuid20 = uuid.substring(0, 20)
      const transactionTime = getCurrentTransactionTime()
      let base_param
      // 判定是宅配訂單還是c2c訂單
      if (ecPayData.shipping === '宅配') {
        base_param = {
          MerchantTradeNo: uuid20, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
          MerchantTradeDate: transactionTime, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
          LogisticsType: 'Home',
          LogisticsSubType: 'TCAT', //黑貓
          GoodsAmount: '20000', //商品價格 1元以上 最高上限20000（指賠償）
          CollectionAmount: 'N',
          IsCollection: 'N',
          GoodsName: '墨韻雅筆', //品牌方店名
          SenderName: '墨韻雅筆', //品牌方店名
          SenderPhone: '29788833', //品牌方聯繫電話
          SenderCellPhone: '0912345678', //品牌方聯繫行動電話
          ReceiverName: `${ecPayData.firstname}${ecPayData.lastname}`,
          ReceiverPhone: '',
          ReceiverCellPhone: ecPayData.mobilephone,
          ReceiverEmail: ecPayData.email,
          TradeDesc: '',
          ServerReplyURL: `${HOST}/api/ecpay-shipping/shipment-status-notification`, // 物流狀況會通知到此URL
          ClientReplyURL: '',
          LogisticsC2CReplyURL: '',
          Remark: '',
          PlatformID: '',
          SenderZipCode: '113',
          SenderAddress: '台北市南港區三重路19-1號6-1樓',
          ReceiverZipCode: ecPayData.postcode,
          ReceiverAddress:
            ecPayData.country + ecPayData.township + ecPayData.address,
          Temperature: '0001',
          Distance: '00',
          Specification: '0001',
          ScheduledPickupTime: '4', //收貨時間（寄件方）
          ScheduledDeliveryTime: '4', //收貨時間（收件方）  1: 13點前 2: 14點~18點  3: 14點~18點     4:不限時
          ScheduledDeliveryDate: '',
          PackageCount: '',
        }
      } else {
        base_param = {
          MerchantTradeNo: uuid20, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
          MerchantTradeDate: transactionTime, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
          LogisticsType: 'CVS', //超商取貨：CVS 宅配:Home
          LogisticsSubType: ecPayData.shipping, //四大超商物流UNIMART、FAMI、HILIFE、UNIMARTC2C、FAMIC2C、HILIFEC2C、OKMARTC2C  & 黑貓：TCAT
          GoodsAmount: '20000', //商品金額範圍為1~20000元。 最高上限20000（指賠償） ,若貨到付款則為實際付款金額
          CollectionAmount: '20000', //同上
          IsCollection: 'N', //Ｙ:貨到付款  ,預設值為N:純配送
          GoodsName: '墨韻雅筆', //品牌名
          SenderName: '墨韻雅筆', //品牌名
          SenderPhone: '29788833',
          SenderCellPhone: '0912345678',
          ReceiverName: `${ecPayData.firstname}${ecPayData.lastname}`,
          ReceiverPhone: '',
          ReceiverCellPhone: ecPayData.mobilephone,
          ReceiverEmail: ecPayData.email,
          TradeDesc: '',
          ServerReplyURL: `${HOST}/api/ecpay-shipping/shipment-status-notification`, // 物流狀況會通知到此URL,因本地測試無法收到,透過電腦終端設置ngrok轉發過來
          ClientReplyURL: '',
          LogisticsC2CReplyURL: 'http://localhost:3000/',
          Remark: '',
          PlatformID: '',
          ReceiverStoreID: ecPayData.store_id, // 請帶收件人門市代號(統一):991182  測試商店代號(全家):001779 測試商店代號(萊爾富):2001、F227
          ReturnStoreID: '', //未設定會返回原寄件門市
        }
      }

      // Object.entries(base_param).forEach(([key, value]) => {
      //   console.log(`${key}: ${value} (${typeof value})`)
      // })

      // 綠界物流 API
      let create = new ecpay_logistics()
      try {
        const resEcpay = await create.create_client.create(base_param)

        // 檢查 API 返回的數據類型，確認它是字符串類型
        if (typeof resEcpay === 'string') {
          console.log('API 回應:', resEcpay)
          if (resEcpay.startsWith('1|')) {
            // 處理正常回應
            // 假設字符串是一個查詢字符串，並使用 URLSearchParams 進行解析
            // 由於字符串以 '1|' 開頭，我們使用 substring(2) 來去除這兩個字符
            const params = new URLSearchParams(resEcpay.substring(2))

            // 從參數構造 ecPay 對象
            const ecPay = {}
            for (const [key, value] of params) {
              ecPay[key] = decodeURIComponent(value)
            }

            console.log('構造的 ecPay 對象:', ecPay) // 輸出構造的 ecPay 對象

            //更新訂單資料庫狀態
            let query = ''
            let queryParams = []
            if (ecPayData.shipping === '宅配') {
              query =
                'UPDATE order_info SET logistics_id = ?, paymentNo = ?, rtn_msg= ? WHERE id = ?'
              queryParams = [
                ecPay.AllPayLogisticsID,
                ecPay.BookingNote,
                ecPay.RtnMsg,
                ecPayData.id,
              ]
            } else {
              query =
                'UPDATE order_info SET logistics_id = ?, paymentNo = ?, rtn_msg= ? WHERE id = ?'
              queryParams = [
                ecPay.AllPayLogisticsID,
                ecPay.CVSPaymentNo + ecPay.CVSValidationNo,
                ecPay.RtnMsg,
                ecPayData.id,
              ]
            }
            const [result] = await mydb.execute(query, queryParams)
          } else {
            // 處理錯誤回應
            console.error('收到錯誤訊息:', resEcpay)
            return // 提早結束函數執行
          }
        } else {
          console.log('未預期的響應類型:', typeof resEcpay)
        }
      } catch (err) {
        console.error('API 調用過程中出錯:', err)
      }
    }

    return res.json({
      status: 'success',
      message: 'linePay金流與ecPay物流成功',
      data: linePayResponse.body,
      ecPay,
    })
  } catch (error) {
    return res.json({ status: 'fail', data: error.data })
  }
})

//因為linepay的confirm路由,只能查詢一次,因此另外設一個路由,可以重複向linepay的伺服器查詢資料
router.get('/check-transaction', async (req, res) => {
  const transactionId = req.query.transactionId

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })
    console.log(linePayResponse.body)

    res.json(linePayResponse.body)
  } catch (err) {
    res.json({ status: 'transactionId錯誤', error: err })
  }
})
export default router
