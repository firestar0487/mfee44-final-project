import React, { useState } from 'react'

import { HiOutlineTicket } from 'react-icons/hi2'

import { CSSTransition } from 'react-transition-group'

export default function CartCoupon({
  coupons = [],
  handleRadioChange = () => {},
  selectedCouponID = '',
}) {
  return (
    <>
      <div className="coupon-container">
        <div className="coupon-box d-flex flex-column ">
          <h3 className="text-h3 text-my-black d-flex ">
            <HiOutlineTicket size="30px" color="#404040" />
            <div className="ms-3 ">可用優惠券</div>
          </h3>
          <div className="mb-2 ">
            <div className="text-h6 text-my-black card-header">
              <label>
                <input
                  type="radio"
                  value="none"
                  checked={selectedCouponID === 'none'}
                  onChange={handleRadioChange}
                  className="me-2"
                />
                不使用優惠券
              </label>
            </div>
          </div>
          {coupons.map((coupon) => (
            <div key={coupon.coupon_code} className=" mb-2 card-header ">
              <div className=" text-h6 text-my-black">
                <label>
                  <input
                    type="radio"
                    name="coupon"
                    value={coupon.coupon_code}
                    checked={selectedCouponID === coupon.coupon_code}
                    onChange={handleRadioChange}
                    className="me-2"
                  />
                  {coupon.coupon_name}
                </label>
              </div>
              <CSSTransition
                in={selectedCouponID === coupon.coupon_code}
                timeout={300}
                classNames="slide"
                unmountOnExit
              >
                <div className="card-body text-h6 text-my-black">
                  <div>有效期限： {coupon.formatted_end_at}</div>
                  <div>{coupon.discount_title}</div>
                </div>
              </CSSTransition>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .coupon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-bottom: 1px solid var(--my-white);
          margin-top: 50px;
          margin-inline: auto;
          padding-bottom: 40px;
          padding-inline: 25%;
          @media (max-width: 991px) {
            letter-spacing: 0.2rem;
          }
        }
        .coupon-box {
          width: 100%;
        }
        .card-header input[type='radio'] {
          cursor: pointer;
        }
        .card-header label {
          user-select: none; /* 防止選中文本 */
        }
        .card-body {
          background-color: var(--my-white); /* 給詳情部分一個淺色背景 */
          height: auto;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </>
  )
}
