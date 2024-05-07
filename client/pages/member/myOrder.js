import React from 'react'
import MyOrderList from '@/components/myCart/productCart/myOrderList'

export default function MyOrder() {
  return (
    <>
      <h1 className="text-h2">我的訂單for bin123</h1>
      <div className="">
        {' '}
        <MyOrderList cName="現有訂單" />
      </div>
      <MyOrderList cName="過往訂單" />
    </>
  )
}
