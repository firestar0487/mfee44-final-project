import React from 'react'
import Link from 'next/link'

export default function OrderSummary({
  text = '下一步',
  boolean = true,
  rawTotalPrice = 0,
  totalPrice = 0,
  formatPrice = () => {},
  handleNextSteap = () => {},
  creatOrderAndPay = () => {},
  shippingFee = 0,
  discount_value = 0,
}) {
  return (
    <>
      <div className="order-container my-auto glass-texture ">
        <div className="d-flex justify-content-between my-2 text-my-black">
          <div className="text-h5">小計</div>
          <div className="text-h6">{formatPrice(rawTotalPrice)}</div>
        </div>
        <div className=" d-flex justify-content-between my-2 text-my-black">
          <div className="text-h5">運費</div>
          <div className="text-h6">{formatPrice(shippingFee)}</div>
        </div>
        <div className="d-flex justify-content-between my-2 text-my-black">
          <div className="text-h5">優惠折扣</div>
          <div className="text-h6 text-my-notice">
            -{formatPrice(discount_value)}
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between mt-4 text-my-black">
          <div className="text-h5">總額</div>
          <div className="text-h6">{formatPrice(totalPrice)}</div>
        </div>

        <div
          onClick={() => {
            //checkout頁面
            handleNextSteap()
            //confiramation頁面使用
            creatOrderAndPay()
          }}
          className="col-md-8 my-4 mx-auto my-button1 pc-button show "
        >
          {text}
        </div>
      </div>

      <style jsx>{`
        .order-container {
          padding: 10px;
          border-radius: 10px;
        }
        .pc-button {
          display: ${boolean ? 'flex' : 'none'};
        }
        @media (max-width: 991px) {
          .pc-button {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
