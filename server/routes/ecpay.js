import express from 'express'
import mydb from '##/configs/mydb.js'
import dotenv from 'dotenv'
import ecpay_payment from 'ecpay_aio_nodejs'
import moment from 'moment'

//綠界物流 sdk
import ecpay_logistics from 'ecpay_logistics_nodejs/index.js'

// 產生uuid用
import { v4 as uuidv4 } from 'uuid'

//產生當下時間 格式：YYYY/MM/DD HH:mm:ss
function getCurrentTransactionTime() {
  return moment().format('YYYY/MM/DD HH:mm:ss')
}

dotenv.config()

const router = express.Router()
const {
  MERCHANTID,
  HASHKEY,
  HASHIV,
  HOST,
  ECPAY_CONFIRM_URL: CONFIRM,
  REACT_REDIRECT_CANCEL_URL,
} = process.env

const options = {
  OperationMode: 'Test', // Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [],
  IsProjectContractor: false,
}

let TradeNo

router.get('/', async (req, res) => {
  const orderId = req.query.orderId
  console.log(orderId)

  try {
    const [result] = await mydb.execute(
      `SELECT * FROM \`order\` WHERE id = ?`,
      [orderId]
    )
    console.log(result)
    const { amount } = result[0]
    console.log(amount)

    if (result.length === 0) {
      // 沒有找到訂單
      return res.status(404).json({ status: 'error', message: '訂單不存在' })
    }

    const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })
    TradeNo = 'ecpay' + new Date().getTime()
    let base_param = {
      MerchantTradeNo: TradeNo,
      MerchantTradeDate,
      TotalAmount: amount.toString(),
      TradeDesc: '測試交易描述',
      ItemName: '墨韻雅筆',
      ReturnURL: `${HOST}/api/ecpay/return`,
      ClientBackURL: `http://localhost:3005/api/ecpay/clientReturn?tradeNo=${TradeNo}`, //需要回傳的時候去訪問伺服器確認交易結果
      // ClientBackURL: `http://localhost:3000`, //當用戶在綠界付款頁面點擊返回網站的網址
    }
    //將綠界金流訂單號存到order表備份
    const [updateResult] = await mydb.execute(
      'UPDATE `order` SET ecpay_TradeNo = ? WHERE id = ?',
      [TradeNo, orderId]
    )
    console.log(updateResult)
    // 請求綠界金流API
    const create = new ecpay_payment(options)
    const html = create.payment_client.aio_check_out_all(base_param)
    //   console.log(html)
    res.render('ecpayUse', { html: html, title: '綠界支付頁面跳轉中...' })
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

router.post('/return', async (req, res) => {
  console.log('req.body:', req.body)

  const { CheckMacValue, MerchantTradeNo, TradeNo, RtnCode } = req.body
  const data = { ...req.body }
  delete data.CheckMacValue

  console.log('查看綠界的確認交易結果')
  console.log(data)

  const create = new ecpay_payment(options)
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data)

  console.log(
    '確認交易正確性：',
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue
  )

  if (CheckMacValue === checkValue && RtnCode === '1') {
    console.log('確認交易正確性：交易成功')

    try {
      // 這裡執行更新資料庫訂單的付款狀態為成功的操作
      const [updateResult] = await mydb.execute(
        `UPDATE \`order\` SET payment_status = 'paid' WHERE ecpay_TradeNo = ?`,
        [MerchantTradeNo]
      )
      console.log('訂單更新成功:', updateResult)

      // 更新優惠卷
      const [resultCoupon] = await mydb.execute(
        `SELECT * FROM \`order\`  WHERE ecpay_TradeNo = ?`,
        [MerchantTradeNo]
      )
      const { user_id, coupon_id } = resultCoupon[0]

      if (coupon_id) {
        const [updateCouppon] = await mydb.execute(
          `UPDATE \`member_coupon\` SET used_valid = '0' WHERE user_id = ? AND coupon_id = ?`,
          [user_id, coupon_id]
        )

        console.log('優惠卷更新成功:', updateCouppon)
      }

      /* 若ecpay支付成功 建立綠界物流訂單 */
      // 用來將ecpay物流傳到前端的容器
      let ecPay = {}

      //透過order_id找到order_info資料
      const [results] = await mydb.execute(
        `SELECT order_info.*, \`order\`.shipping, \`order\`.amount
         FROM order_info
         JOIN \`order\` ON order_info.id = \`order\`.order_info_id
         WHERE \`order\`.ecpay_TradeNo = ?;`,
        [MerchantTradeNo]
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

      return res.json({
        status: 'success',
        message: 'ecPay金流與ecPay物流成功',
        data: data,
        ecPay,
      })
    } catch (error) {
      console.error('更新訂單狀態時發生錯誤:', error)
      // 可以考慮回傳錯誤資訊給綠界或進行錯誤處理
    }
  } else {
    console.log('交易驗證失敗或交易失敗', CheckMacValue, checkValue)
    // 可以考慮回傳錯誤資訊給綠界或進行錯誤處理
  }
})

router.get('/clientReturn', async (req, res) => {
  const ecpayTradeNo = req.query.tradeNo
  const [rows] = await mydb.execute(
    'SELECT * FROM `order` WHERE ecpay_TradeNo=?',
    [ecpayTradeNo]
  )
  if (rows.length > 0 && rows[0].payment_status === 'paid') {
    res.redirect(CONFIRM + `?amount=${rows[0].amount}`)
  } else {
    res.redirect(REACT_REDIRECT_CANCEL_URL)
  }
})

export default router
