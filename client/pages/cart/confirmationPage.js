import React, { useEffect, useState } from 'react'
import FluidLayout from '@/components/layout/fluid-layout'
import { LuCheckCircle2 } from 'react-icons/lu'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

//勾子context
import { useCart } from '@/hooks/user-cart'

export default function ConfirmationPage() {
  const router = useRouter()

  const { formatPrice } = useCart()

  // confirm回來用的，在記錄確認之後，line-pay回傳訊息與代碼，例如
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })
  //顯示訂單成功的總金額
  const [totalPrice, setTotalPrice] = useState('')
  // 回傳回來的成功訂單詳細資料,後續開發可能用到
  const [orderInfo, setOrderInfo] = useState([])
  console.log(result)

  //顯示付款成功後的額度,並存在session
  useEffect(() => {
    if (sessionStorage.getItem('successOrderPrice')) {
      const savePrice = JSON.parse(sessionStorage.getItem('successOrderPrice'))
      setTotalPrice(savePrice)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('successOrderPrice', JSON.stringify(totalPrice))
  }, [totalPrice])

  // 確認交易，處理伺服器通知line pay已確認付款，為必要流程
  const handleConfirm = async (transactionId) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/line-pay-first/confirm?transactionId=${transactionId}`
      )

      const data = await res.json() //解析回傳的json檔案
      console.log(data)

      if (data.status === 'success') {
        toast.success('付款成功')
      }

      if (data.data) {
        setResult(data.data)
        setOrderInfo(data.data.info.packages[0])
        setTotalPrice(data.data.info.packages[0].amount)
      }
    } catch (error) {
      console.error('處理linPay訂單發生成錯誤', error)
    }
  }

  //confirm 用戶付款成功後，跳轉回來的行為，
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      // http://localhost:3000/cart/confirmation?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query
      if (!transactionId || !orderId) {
        // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
        router.push('/')
        return
      }
      handleConfirm(transactionId)
    }
  }, [router.isReady, router.query])
  return (
    <>
      <div className=" background-container my-3 ">
        <div className="confirm-box">
          <h1 className="text-h1 text-my-primary ">
            <div className=" loader mb-3">
              <LuCheckCircle2 />
            </div>
            付款成功
          </h1>
          <p className="text-h4 text-my-notice my-2">
            {formatPrice(totalPrice)}
          </p>
          <Link href={`/member/orders`}>
            <div className="my-btn-check mt-3">查看訂單詳情</div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .background-container {
          min-height: 100svh;
          background-image: url('/images/common/cis-bg1.svg');
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .confirm-box {
          width: 1000svh;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: #fff;
        }
        .my-btn-check {
          padding: 8.25px 20px 9.25px 20px;

          border-radius: 37.5px;
          background-color: var(--my-primary);
          font-size: var(--h6);
          font-weight: 400;
          color: var(--my-white);
          cursor: pointer;

          &:hover {
            background-color: transparent;
            border-radius: 37.5px;
            border: 1.125px solid var(--primary, #7c7477);
            color: var(--my-primary);
          }
        }
        @keyframes spin {
          0%,
          100% {
            color: var(--my-primary);
            transform: scale(1.2);
            opacity: 0.5;
          }
          50% {
            color: var(--my-secondary);
            transform: scale(1);
            opacity: 1;
          }
        }
        .loader {
          animation: spin 1.5s ease-in-out infinite; /* 應用旋轉動畫 */
        }
      `}</style>
    </>
  )
}

ConfirmationPage.getLayout = function (page) {
  return <FluidLayout>{page}</FluidLayout>
}
