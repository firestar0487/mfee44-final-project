import React from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss'
export default function UsedCoupon({ coupon }) {
  const get_coupon = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/coupon/get/?id_coupon=${coupon.id}`,
        { credentials: 'include' }
      )
      const result = await response.json()
      if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: '請先登入後再領取',
          showCancelButton: true,
          confirmButtonText: '去登入',
          cancelButtonText: '取消',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'http://localhost:3000/member/login'
          }
        })
      } else {
        Swal.fire({
          icon: result.status,
          title: result.msg,
          timer: 1500,
        }).then(() => {
          if (result.status === 'success') {
            location.reload()
          }
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <div className="coupon col-xl-4 col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
        <div className="coupon-background">
          {/* <img src="/images/myCoupon/coupon_background_02.png" alt="" /> */}
          <div className="text-container">
            <h3>
              {/* 歡慶鋼筆盛典！ */}
              {coupon.coupon_name}
            </h3>
            <p className="discount m-0">
              {/* 85折優惠！ */}
              {coupon.discount_title}
            </p>
            <p className="expiration m-0">
              {/* 有效期限：2024.12.31 */}
              {coupon.start_at.split('T')[0]}
              <b>~</b>
              {/* 有效期限：2024.12.31 */}
              {coupon.end_at.split('T')[0]}
            </p>
            <a
              className="rule_link"
              href="http://localhost:3000/coupon/activity_rule"
            >
              使用規則
            </a>
            {!coupon.coupon_id && (
              <a
                onClick={get_coupon}
                className={`button ${coupon.status === 1 ? 'be_used' : ''}`}
              >
                {coupon.status === 1 ? '已領取' : '領取'}
              </a>
            )}
            <div>
              {coupon.used_valid === 0 ? (
                <div className="be_used">已使用</div>
              ) : (
                <div>{/* 其他相關元素 */}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .coupon-background {
            background: url('/images/myCoupon/coupon_background_02.png')
              repeat-x center center;
            background-size: cover;
            text-align: center;
            width: 70%;
            height: 200px;
            margin: 10px 0;

            display: flex; /* 使用 Flexbox */
            position: relative;
            justify-content: center; /* 水平置中 */
            align-items: center; /* 垂直置中 */
            filter: drop-shadow(0px 0px 4px #9c9d9d);
            & img {
              position: absolute;
              width: 100%;
              object-fit: cover;
            }
            &::after {
              content: '';
              display: block;
              background: url('/images/myCoupon/coupon_background_03.png')
                no-repeat center center;
              background-size: contain;
              position: absolute;
              right: -76px;
              width: 100px;
              height: 200px;
              z-index: 999;
            }
            &::before {
              content: '';
              display: block;
              background: url('/images/myCoupon/coupon_background_01.png')
                no-repeat center center;
              background-size: contain;
              position: absolute;
              left: -77px;
              width: 100px;
              height: 200px;
              z-index: 999;
            }
            &:hover {
              filter: drop-shadow(0px 0px 3px rgb(230 40 124 / 80%));
            }
          }
          .text-container {
            position: absolute;
            padding: 10px;
            width: 100%;
            object-fit: cover;

            h1 {
              font-size: 24px;
              color: #333;
            }
            h3 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p {
              color: #555;
              margin-bottom: 10px;
            }
            b {
              margin: 0 5px;
            }
            .rule_link {
              display: block;
              color: #600;

              &:hover {
                text-decoration: underline;
                color: #f00;
              }
            }
            .discount {
              color: #e44d26;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .expiration {
              color: #777;
              line-height: 16px;
              padding: 8px 0 4px;
            }

            .button,
            .used,
            .be_used {
              display: inline-block;
              padding: 3px 10px;
              border: 1.5px #fff solid;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              cursor: pointer;
            }
            .button {
              background: #e44d26;
              &:hover {
                border: 1.5px #e44d26 solid;
                color: #e44d26;
                background: #fff;
              }
            }
            .used {
              background: #333333;
            }
            .be_used {
              background: #999999;
            }
          }
          @media (max-width: 991px) {
            .coupon-background {
              background-size: contain;
            }
          }
          @media (max-width: 500px) {
            .coupon-background {
              background-size: cover;
              width: 30%;
            }
          }
          @media (max-width: 375px) {
            .coupon {
              width: 200px !import;
              padding: 0px !import;
            }
          }
        `}
      </style>
    </>
  )
}
