import React from 'react'

export default function activity_main() {
  return (
    <>
      <div className="content">
        <ul>
          <li>
            <b>有效期限 </b>
            <p>2024年3月4日 12:00 - 2024年4月7日 </p>
          </li>
          <li>
            <b>優惠內容 </b>
            <p> 低消 $3,000 現折300$</p>
          </li>
          <li>
            <b>商品</b>
            <p>所有商品</p>
          </li>
          <li>
            <b>付款 </b>
            <p>適用於所有付款方式</p>
          </li>
          <li>
            <b>查看詳情 </b>
            <p>
              1.優惠期間為2024年3月4日至2024年3月11日，逾期無效。<br />
              2.顧客需在單筆交易中消費滿$3,000方可享有現金折扣。<br />
              3.優惠不得與其他折扣或促銷活動同時使用。<br />
              4.優惠不得兌換現金或其他價值等同之商品,商家保留最終解釋權。
            </p>
          </li>
        </ul>
        <a className="ok-btn" href="http://localhost:3000/coupon/activity">
          了解
        </a>
      </div>

      <style jsx>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          /* body {
        padding: 0;
        margin: 0;
        width: 100%;
      } */
          .content {
            width: 720px; /* 自訂 */
            margin: 0 auto;
            background: #efefef; /* 自訂 */
            font-size: 16px;
            line-height: 1.2;
            padding: 4%;
            ul {
              width: 100%;
              padding: 0;
              margin: 0;

              li {
                list-style: none;
                padding: 3% 2%;
                border-bottom: 1px solid #ccc;
              }
              li:last-child {
                border-bottom: none;
              }
            }
            b {
              font-weight: bold;
              display: inline-block;
              margin-bottom: 5px;
            }
            p {
              padding: 0;
              margin: 0;
            }
          }
          .ok-btn {
            display: block;
            width: 80%;
            margin: 0 auto;
            text-align: center;
            line-height: 50px;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            background: rgb(212, 57, 57);
            margin-top: 40px;

            &:hover {
              background: rgb(47, 75, 144);
            }
          }
          @media (max-width: 1170px) {
            .content {
              width: 100%;
              padding: 8% 4%;
              ul {
                li {
                  padding: 4%;
                }
              }
            }
          }
        `}
      </style>
    </>
  )
}
