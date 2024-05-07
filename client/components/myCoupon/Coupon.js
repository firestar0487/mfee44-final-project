import React from 'react'

export default function UserCoupon1() {
  return (
    <>
      <div className="coupon-container container">
        <div className="coupon">
          <div className="penbox">
            <img src="/images/myCoupon/pen.jpg" alt="" />
          </div>
          <div className="coupon-text-wrapper">
            <div className="coupon-content">
              <div className="pp ">
              <div className='text-h3'>
              歡慶鋼筆盛典！全站優惠卷限時放送</div>
                <p className="couponmind text-p">
                  親愛的筆友們，感謝您長期以來對我們鋼筆網站的支持與喜愛！
                  為了慶祝這個特別的時刻，我們推出全站優惠卷，讓您在挑選心儀鋼筆時享受更多的折扣。
                </p>
              </div>
              <div className='discount'>
                <h2>85折</h2>
              </div>
            </div>
            <div className="coupon-date">
              <p>優惠券代碼有效期至：2024年12月31日</p>
              <button className="claim-button">領取優惠</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`

        .coupon-content {
            display: flex;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f8f8f8;
          }
          p {
            display: inline-block;
            margin-bottom: 0;
          }
          .penbox {
            width:160px;
            height: 200px;
            
          }
          .penbox img{
            width:100%;
            height:100%;
            object-fit:cover;

          }
          .couponmind {
          }
          .coupon {
            width:650px;
            height:200px;
            display: flex;
            position: relative;
            background-color: #fff;
            border: 2px solid #dbdbdb;
            /* border-radius: 8px; */
            box-shadow: 0 0 10px rgba(121, 121, 121, 0.1);
            /* padding: 20px; */
            text-align: left;
            /* margin-bottom: 10px; */
          }

          

          .coupon h2 {
            color: #333;
          }

          .discount {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 100px;
          }

          .pp {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
            margin-top: 5px;
            left: 10px;
            /* 將文字向上移動 10px */
            padding-left: 15px;
          }

          .coupon .code {
            font-size: 20px;
            color: #ff4500;
            font-weight: bold;
          }

          .coupon img {
            width: 100%;
          }

          .claim-button {
            background-color: #cf3155;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
            border-radius: 25px;
          }
          .coupon-date {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
