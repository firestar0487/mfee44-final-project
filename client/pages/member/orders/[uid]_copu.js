import React, { useEffect, useState } from 'react'
import MyOrderList from '@/components/myCart/productCart/myOrderList'
import { useRouter } from 'next/router'

export default function MyOrder() {
  const router = useRouter()
  const { uid } = router.query

  const [orderData, setOrderData] = useState([])
  console.log(orderData)

  //取得token 令牌
  const [token, setToken] = useState('')
  console.log(token)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    // console.log(storedToken)
    if (storedToken) {
      setToken(storedToken)
    }
  }, []) // 空依賴數組確保只在組件掛載時運行

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [uid, token])

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/orders/orders/${uid}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      if (data.status === 'success') {
        setOrderData(data.data)
        console.log(data)
      } else {
        console.error('Failed to fetch order data:', data.message)
      }
    } catch (error) {
      console.error('Fetching order data failed:', error)
    }
  }

  return (
    <>
      <div className="">
        <MyOrderList cName="現有訂單" orderData={orderData} />
      </div>
      {/* <MyOrderList cName="過往訂單" /> */}
    </>
  )
}
