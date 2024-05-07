import React, { useEffect, useState } from 'react'
import MyOrderList from '@/components/myCart/productCart/myOrderList'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth' // 確保這是 useAuth Hook 正確的路徑

export default function MyOrder() {
  useAuth()
  const router = useRouter()

  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/orders/orders`, // 使用参数中的 userId
        {
          method: 'GET',
          credentials: 'include',
        }
      )
      const data = await response.json()
      if (data.status === 'success') {
        setOrderData(data.data)
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
