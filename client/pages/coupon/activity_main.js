import React from 'react'


export default function Home() {

  return (
    <>
   
      <div className="p-activity">
        <ul>
          <li>
            <img src="/images/myCoupon/activity_banner.png" alt="" />
          </li>
        </ul>

        <div className="title_h2">冬日溫暖，書寫心情！</div>
        <div className="main_h3">
          ✨ 優惠劵領取說明 ✨<br />
          📅 活動期間：2024年03月05日 至 2024年04月11日 🎉
          <br />
          購物滿3000元即享折扣300元！ <br />
          💡 如何獲得優惠：
          <br />
          在活動期間，購物滿3000元即可自動獲得折扣300元。
          <br />
          無需輸入代碼，系統將在結帳時自動計算折扣。
          <br />
          ✨ 優惠使用注意事項：
          <br />
          此優惠僅限活動期間內使用。 不限名額，全站商品均適用。
          <br />
          折扣將直接反映在結帳金額上。
          <br />
          別錯過這個冬季溫馨優惠，寫下屬於你的暖心時刻！📝🌨️
        </div>

       
       
          <li>
            <img src="/images/myCoupon/activity_banner.png" alt="" />
          </li>
  

        
        
        
      </div>

      <style jsx>{`
        .p-activity {
          width: 980px;
          margin: 0 auto;

          & img {
            width: 100%;
            height: auto;
          }
          ul {
            margin: 0px;
            padding: 0px;
            li {
              margin: 10px 0;
              list-style: none;
            }
          }
        }
        .title_h2 {
          /* background:url('/images/myCoupon/title.png')
            no-repeat left center; */

          background: #ff0083;
          width: fit-content;
          background-size: cover;
          height: 72px;
          color: #fff;
          font-size: 25px;
          line-height: 72px;
          padding: 0 10px;
          position: relative;

          &::after {
            content: '';
            display: block;
            background: url('/images/myCoupon/title_2.png') no-repeat center
              left;
            background-size: contain;
            position: absolute;
            right: -76px;
            width: 72px;
            height: 72px;
            top: 0;
          }
        }
      `}</style>
    </>
  )
}