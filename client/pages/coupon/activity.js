import React, { useState, useEffect } from 'react';
import UsedCoupon from '@/components/myCoupon/UsedCoupon';

export default function Home() {
  const [data, setData] = useState([]);
  const [data_2, setData_2] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    user_id: '',
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/profile', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const userData = await response.json();
      setUser({ user_id: userData.user_id });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchMemberData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/coupon/activity/?type=1', { credentials: 'include' });
      const response_2 = await fetch('http://localhost:3005/api/coupon/activity/?type=2', { credentials: 'include' });

      if (!response.ok || !response_2.ok) {
        throw new Error('Failed to fetch member data');
      }

      const result = await response.json();
      const result_2 = await response_2.json();

      setData(result);
      setData_2(result_2);
    } catch (error) {
      setError('Error fetching member data');
      console.error('Error:', error);
    }
  };

  const fetchDefaultData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/coupon/activityDef/?type=1');
      const response_2 = await fetch('http://localhost:3005/api/coupon/activityDef/?type=2');

      if (!response.ok || !response_2.ok) {
        throw new Error('Failed to fetch member data');
      }

      const result = await response.json();
      const result_2 = await response_2.json();
      
      setData(result);
      setData_2(result_2);
    } catch (error) {
      setError('Error fetching default data');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  useEffect(() => {
    if (user.user_id) {
      fetchMemberData(); 
    } else {
      fetchDefaultData(); 
    }
  }, [user]);
  return (
    <>
      {/* 3000折300$ */}
      <div className="p-activity">
        <ul>
          <li className="banner1">
            <img src="/images/myCoupon/activity_banner.png" alt="" />
          </li>
        </ul>

        <div className="title_h2">冬日溫暖，書寫心情！</div>
        <div className="main_h3">
          ✨ 優惠劵領取說明 ✨<br />
          📅 活動期間：2024年03月04日 至 2024年04月11日 🎉
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

        <ul>
          <li>
            <div className="c3000 row cols-lg-3">
               {data.map((v, i) => (
                <UsedCoupon key={v.id} coupon={v} />
              ))}
            </div>
          </li>
          <li className="banner2">
            <img src="/images/myCoupon/banner2.png" alt="" />
          </li>
        </ul>

        {/* 5000折500$ */}
        <div>
          <div className="title_h2">春季送送送!</div>
        </div>
        <div className="main_h3">
          ✨ 春季送送送! ✨<br />
          📅 活動期間：2024年03月04日 至 2024年04月11日 🎉
          <br />
          購物滿5000元即享折扣500元！ <br />
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
        <ul>
          <li>
            <div className="c5000 row row-cols-lg-3">
              {data_2.map((v, i) => {
                if (v.coupon_valid === 1) {
                  return <UsedCoupon key={v.id} coupon={v} />
                }
              })}
            </div>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .p-activity {
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
        @media (max-width: 375px) {
          .c3000{
            width:391px;
          }
          .c5000{
            width:391px;
          }
        }
        @media (max-width: 375px) {
          .p-activity {
            width: 375px;
            margin: 0 auto;

            & img {
              width: 100%;
              height: auto;
            }
            ul {
              margin: 0px;
              padding: 0px;
              justify-content: non;
              li {
                margin: 10px 0;
                list-style: none;
              }
            }
          }
          @media (max-width: 375px) {
            .title_h2 {
              /* background:url('/images/myCoupon/title.png')
            no-repeat left center; */
              /*margin: 0 auto;*/
              /*text-align: center;*/
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
            .main_h3 {
              /*text-align: center;*/
            }
          }
        }

        @media (max-width: 391px) {
          .banner1 {
            width: 391px;
          }
          .banner2 {
            width: 391px;
          }
        }
      `}</style>
    </>
  )
}
