import React from 'react'
import products from '@/data/myProductTest.json'

//勾子context
import { useCart } from '@/hooks/user-cart'

export default function ProductListTest() {
  const { addCartItem } = useCart()
  return (
    <>
      <h1>模擬產品列表</h1>
      <div className="general-container">
        <h3>【商品】</h3>
        {products
          .filter((v) => v.type === 'general')
          .map((v) => (
            <div className="item my-3" key={v.id}>
              <div className="name">名稱：{v.name}</div>
              <div className="price">價格：{v.price}</div>
              <div className="brand">品牌：{v.brand}</div>
              <div className="cloro">顏色：{v.color}</div>
              <div className="martrial">材質：{v.material}</div>
              <div className="desc">介紹：{v.desc}</div>
              <button
                onClick={() => {
                  addCartItem(v)
                }}
                className="addItem"
              >
                加到購物車
              </button>
            </div>
          ))}
      </div>
      <div className="general-container">
        <h3>【課程】</h3>
        {products
          .filter((v) => v.type === 'course')
          .map((v) => (
            <div className="item my-3" key={v.id}>
              <div className="name">名稱：{v.name}</div>
              <div className="price">價格：{v.price}</div>
              <div className="brand">老師：{v.teacher}</div>
              <div className="cloro">分類：{v.category}</div>
              <div className="martrial">上課時數：{v.total_minute}分鐘</div>
              <div className="isOnline">
                上課形式：{v.isOnline ? '線上' : '線下'}
              </div>
              <div className="desc">介紹：{v.desc}</div>
              <button
                onClick={() => {
                  addCartItem(v)
                }}
                className="additem"
              >
                加到購物車
              </button>
            </div>
          ))}
      </div>
    </>
  )
}
