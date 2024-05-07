import express from 'express'
import moment from 'moment'

import mydb from '##/configs/mydb.js'
import ecpay_logistics from 'ecpay_logistics_nodejs/index.js'

// 產生uuid用
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

//產生當下時間 格式：YYYY/MM/DD HH:mm:ss
function getCurrentTransactionTime() {
  return moment().format('YYYY/MM/DD HH:mm:ss')
}

/* 綠界門市地圖 */
router.post('/ecpay-shippment', async (req, res) => {
  const shipping = req.body.shipping

  //建立廠商訂單編號
  const uuid = uuidv4().replace(/-/g, '')
  const uuid20 = uuid.substring(0, 20)
  let base_param = {
    MerchantTradeNo: uuid20, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    ServerReplyURL:
      'http://localhost:3005/api/ecpay-shipping/selectedStoreInfo', // 物流狀況會通知到此URL
    LogisticsType: 'CVS',
    LogisticsSubType: shipping,
    IsCollection: 'N',
    ExtraData: '',
    Device: '',
  }

  let create = new ecpay_logistics()

  try {
    let resData = await create.query_client.expressmap(base_param)
    // 傳給前端打印電子地圖表單
    res.json({ status: 'success', data: resData })
  } catch (err) {
    console.error(err)
    res.status(500).send({ status: 'error', message: 'Internal server error' })
  }
})

/* 接收用戶前台選的門市資料,並回傳給前端 */
router.post(`/selectedStoreInfo`, (req, res) => {
  console.log(req.body)
  const { LogisticsSubType, CVSStoreID, CVSStoreName, CVSAddress } = req.body
  // 假設這些資料需要經過適當的處理或編碼
  res.redirect(
    `http://localhost:3000/cart/checkout?storeType=${LogisticsSubType}&storeID=${CVSStoreID}&storeName=${CVSStoreName}&storeAddress=${CVSAddress}`
  )
})

/* 向ecpayAPI發起創建門市物流訂單狀態請求 (暫時用不到) */
// router.post('/create-shipping-order', async (req, res) => {
//   //建立廠商訂單編號
//   const uuid = uuidv4().replace(/-/g, '')
//   const uuid20 = uuid.substring(0, 20)
//   const transactionTime = getCurrentTransactionTime()

//   //構造綠界ＡＰＩ請求數據
//   // c2c物流訂單
//   let base_param = {
//     MerchantTradeNo: uuid20, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
//     MerchantTradeDate: transactionTime, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
//     LogisticsType: 'CVS', //超商取貨：CVS 宅配:Home
//     LogisticsSubType: 'UNIMARTC2C', //四大超商物流UNIMART、FAMI、HILIFE、UNIMARTC2C、FAMIC2C、HILIFEC2C、OKMARTC2C  & 黑貓：TCAT
//     GoodsAmount: '200',
//     CollectionAmount: '200',
//     IsCollection: 'Y', //Ｙ:貨到付款  ,預設值為空:純配送
//     GoodsName: '墨韻雅筆',
//     SenderName: '墨韻雅筆',
//     SenderPhone: '29788833',
//     SenderCellPhone: '0912345678',
//     ReceiverName: '呆呆獸',
//     ReceiverPhone: '0229768888',
//     ReceiverCellPhone: '0912345678',
//     ReceiverEmail: 'tesy@gmail.com',
//     TradeDesc: '',
//     ServerReplyURL:
//       'https://da33-114-25-134-143.ngrok-free.app/api/ecpay-shipping/shipment-status-notification', // 物流狀況會通知到此URL,因本地測試無法收到,透過電腦終端設置ngrok轉發過來
//     ClientReplyURL: '',
//     LogisticsC2CReplyURL: 'http://localhost:3000/',
//     Remark: '',
//     PlatformID: '',
//     ReceiverStoreID: '131386', // 請帶收件人門市代號(統一):991182  測試商店代號(全家):001779 測試商店代號(萊爾富):2001、F227
//     ReturnStoreID: '',
//   }

//   //宅配
//   // let base_param = {
//   //   MerchantTradeNo: uuid20, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
//   //   MerchantTradeDate: transactionTime, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
//   //   LogisticsType: 'Home',
//   //   LogisticsSubType: 'TCAT', //黑貓
//   //   GoodsAmount: '10000', //商品價格 1元以上
//   //   CollectionAmount: 'N',
//   //   IsCollection: 'N',
//   //   GoodsName: '墨韻雅筆',
//   //   SenderName: '墨韻雅筆',
//   //   SenderPhone: '29788833',
//   //   SenderCellPhone: '0912345678',
//   //   ReceiverName: '呆呆獸',
//   //   ReceiverPhone: '',
//   //   ReceiverCellPhone: '0912345678',
//   //   ReceiverEmail: '',
//   //   TradeDesc: '',
//   //   ServerReplyURL:
//   //     'https://fdaf-2001-b400-e3d3-10c8-7dd8-737f-2fc3-94cc.ngrok-free.app/api/ecpay-shipping/shipment-status-notification', // 物流狀況會通知到此URL
//   //   ClientReplyURL: '',
//   //   LogisticsC2CReplyURL: '',
//   //   Remark: '',
//   //   PlatformID: '',
//   //   SenderZipCode: '115',
//   //   SenderAddress: '台北市南港區三重路19-1號6-1樓',
//   //   ReceiverZipCode: '115',
//   //   ReceiverAddress: '台北市南港區三重路19-1號6-1樓',
//   //   Temperature: '0001',
//   //   Distance: '00',
//   //   Specification: '0001',
//   //   ScheduledPickupTime: '4',
//   //   ScheduledDeliveryTime: '4',
//   //   ScheduledDeliveryDate: '',
//   //   PackageCount: '',
//   // }

//   //綠界API
//   let create = new ecpay_logistics()

//   //調用創建物流訂單的方法
//   const resEcpay = create.create_client.create(base_param)

//   if (typeof resEcpay === 'string') {
//     console.log(resEcpay)
//   } else {
//     resEcpay
//       .then((result) => {
//         // 使用 URLSearchParams 來解析查詢字符串
//         const params = new URLSearchParams(result.substring(2))

//         // 構建 JSON 物件
//         const data = {}
//         for (const [key, value] of params) {
//           data[key] = decodeURIComponent(value)
//         }

//         res.json({ status: 'success', data })
//       })
//       .catch((err) => {
//         console.log(err, '發生錯誤')
//       })
//   }
// })

/* 向ecpayAPI發起查詢物流訂單狀態請求 */
router.get('/querylogisticstradeinfo', (req, res) => {
  const allPayLogisticsID = req.query.allPayLogisticsID

  // 當參數值為[PLEASE MODIFY]時，請在每次測試時給予唯一值
  const baseParam = {
    AllPayLogisticsID: allPayLogisticsID, // 請帶入20碼uid，例如：84851681561813188188，這是在創建物流訂單時獲得的物流交易編號
    PlatformID: '',
  }

  const create = new ecpay_logistics()
  const ecPayRes = create.query_client.querylogisticstradeinfo(baseParam)

  if (typeof ecPayRes === 'string') {
    console.log(ecPayRes)
  } else {
    ecPayRes
      .then((result) => {
        // 使用 URLSearchParams 來解析查詢字符串
        const params = new URLSearchParams(result)

        // 構建 JSON 物件
        const data = {}
        for (const [key, value] of params) {
          data[key] = decodeURIComponent(value)
        }

        res.json({ status: 'success', data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

/* 綠界ＡＰＩ回傳的狀態通知 - 需電腦終端設置ngrok轉發過來*/
router.post('/shipment-status-notification', async (req, res) => {
  console.log('綠界狀態通知123')
  console.log(req.body)
  const ecpayUpdate = req.body

  try {
    const [result] = await mydb.execute(
      'UPDATE order_info SET  rtn_msg= ? WHERE logistics_id = ?',
      [ecpayUpdate.RtnMsg, ecpayUpdate.AllPayLogisticsID]
    )
    console.log(`更新綠界物流訂單${ecpayUpdate.AllPayLogisticsID}成功`)
  } catch (error) {
    console.error('綠界物流訂單更新資料失敗', error)
  }
})

export default router
