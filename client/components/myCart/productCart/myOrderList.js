import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import SmallCourseCart from '../smallCourseCart'
import SmallProductCart from '../smallProductCart'

import { useCart } from '@/hooks/user-cart'

export default function MyOrderList({ cName = '', orderData = [] }) {
  const [openId, setOpenId] = useState(null)

  const { formatPrice } = useCart()

  const toggleOpen = (id) => {
    setOpenId((currentOpenId) => (currentOpenId === id ? null : id))
  }

  return (
    <div className="container py-4 ">
      <h2 className="text-h3 ">{cName}</h2>
      <div className="text-h6 ">
        {orderData.map((order, index) => {
          //處理product資料給SmallProductCart元件
          const productItems = order.order_items
            .filter((item) => item.product_type === 1)
            .map((item) => ({
              ...item,
              qty: item.order_item_quantity,
              id: item.order_item_id,
              // 可以在這裡移除原本的 name 屬性，如果你不想保留它：
              // 注意，這是選擇性的，取決於你是否還需要原來的 name 屬性。
              // 如果需要保留原名，這一行可以不加。
              description: undefined,
              image: '/images/myProduct/' + item.image,
              url: 'http://localhost:3000/product/' + item.order_item_id,
            }))

          //處理course資料給SmallCourseCart元件
          const courseItems = order.order_items
            .filter((item) => item.product_type === 2)
            .map((item) => ({
              ...item,
              qty: item.order_item_quantity,
              id: item.order_item_id,
              description: undefined,
              image: `http://localhost:3005/course/images/course_${
                item.image.split('_')[1].split('.')[0] % 25
              }.jpg`,
              url: 'http://localhost:3000/course/' + item.order_item_id,
            }))
          console.log(courseItems)
          return (
            <React.Fragment key={index}>
              <div className="container-myOrderList  mb-3 shadow-sm ">
                <div className="d-flex justify-content-around align-items-center ">
                  <div className="order-head ">
                    <h5 className="mb-0 text-h6 me-5 ">
                      <span className="text-h6 text-my-black d-none d-md-block">
                        訂單{index + 1}
                      </span>
                    </h5>
                    <p className="mb-0 text-muted  me-5 text-h6 text-my-black d-none d-md-block ">
                      {order.order_created_at}
                    </p>
                    <p
                      className={`mb-0  me-5 text-h6 text-my-black ${
                        order.payment_status === '付款成功'
                          ? 'text-success'
                          : 'text-danger'
                      }`}
                    >
                      {order.payment_status}
                    </p>
                  </div>
                  <p
                    className={`mb-0 flex-shrink-0 mx-auto me-5 text-h6 text-my-black d-none d-md-block ${
                      order.rtn_msg === '收貨訂單處理異常,請聯繫客服'
                        ? 'text-danger'
                        : 'text-success'
                    }`}
                  >
                    {order.payment_status === '未付款成功'
                      ? '未成立'
                      : order.rtn_msg}
                  </p>
                  <p className="mb-0 text-h6 text-my-black  ms-auto text-center">
                    <span className="font-weight-bold  me-5 text-h6 text-my-notice ">
                      {formatPrice(order.amount)}
                    </span>
                    <p className="mb-0 text-muted  me-5 text-p text-center text-my-black d-md-none  ">
                      {order.order_created_at}
                    </p>
                  </p>
                  <Button
                    className="flex-shrink-0"
                    variant=" bg-my-primary text-my-white rounded-5 text-h6 "
                    onClick={() => toggleOpen(index)}
                    aria-controls={`collapse-text-${index}`}
                    aria-expanded={openId === index}
                  >
                    詳細
                  </Button>
                </div>
                <Collapse in={openId === index}>
                  <div id={`collapse-text-${index}`} className="mt-3">
                    <div className="order-body d-flex justify-content-around my-5  py-4">
                      <div className="text-h6 ">
                        <h4 className="text-h3">顧客資訊</h4>
                        <div className="firstName">
                          {order.firstname}{' '}
                          <span className="lastName">{order.lastname}</span>
                        </div>
                        <div className="email">{order.email}</div>
                        <div className="mobliePhone">{order.mobilephone}</div>
                      </div>
                      <div className="text-h6">
                        <h4 className="text-h3">運送資訊</h4>
                        {order.shipping === '黑貓宅急便' && (
                          <>
                            <div className="country">
                              {order.country}
                              <span className="township">
                                {' '}
                                {order.township}
                              </span>
                            </div>
                            <div className="address"> {order.address}</div>
                            <div className="postcode">{order.postcode}</div>
                          </>
                        )}
                        {order.shipping !== '黑貓宅急便' && (
                          <>
                            <div className="">
                              <span className="shipping">{order.shipping}</span>
                            </div>
                            <div className="store_name">
                              {' '}
                              {order.store_name}
                            </div>
                            <div className="store_address">
                              {order.store_address}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-h6">
                        <h4 className="text-h3">付款資訊</h4>
                        <div className="payType">{order.payment}</div>
                      </div>

                      <div className="text-h6">
                        <h4 className="text-h3">訂單編號</h4>
                        <div className="payType">{order.order_id}</div>
                        <h4 className="text-h3 mt-3">貨物訂單號</h4>
                        <div className="payType">{order.paymentNo}</div>
                      </div>
                      <div className="text-h6 d-md-none">
                        <h4 className="text-h3">貨物狀態</h4>
                        <div className="payType">
                          <p
                            className={`mb-0 flex-shrink-0 mx-auto me-5 text-h6 text-my-black  ${
                              order.rtn_msg === '收貨訂單處理異常,請聯繫客服'
                                ? 'text-danger'
                                : 'text-success'
                            }`}
                          >
                            {order.payment_status === '未付款成功'
                              ? '未成立'
                              : order.rtn_msg}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <SmallProductCart cartGeneral={productItems} />
                      <SmallCourseCart cartCourse={courseItems} />
                    </div>
                  </div>
                </Collapse>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <style jsx>{`
        .container-myOrderList {
          padding: 20px;
          background-color: ;
          border: 1px solid #dee2e6;
          border-radius: 5px;
        }
        .order-body {
          display:flex
          justify-content:space-around;
          border-block: 1px solid var(--my-white);
         
        }
        @media (max-width: 991px) {
          .order-body {
            flex-direction: column;
            align-items: start;
            &>div {
            margin-bottom:20px;
          }
          }
        }
        .order-head {
          display: flex;
          align-items: center;
         
        }
        @media (max-width: 991px) {
          .order-head {
            flex-direction: column;
            align-items: start;
          }
        }
      `}</style>
    </div>
  )
}
