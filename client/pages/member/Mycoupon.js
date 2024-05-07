import React from 'react'
import UsedCoupon from '@/components/myCoupon/UsedCoupon'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
// import couponData from '@/data/ianCoupon.json'
import { useState, useEffect } from 'react'

const CouponPage = () => {
  // const [coupon, setCoupon] = useState(couponData)
  // console.log(coupon)

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/coupon/memberCoupon',
        {
          method: 'GET',
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const responseData = await response.json()
      setData(responseData.results)
      console.log(responseData.results)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="coupon-container">
        <div className="coupon-content">
          <div className="coupon-content__title">我的優惠劵</div>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="全部">
              <div className="coupon-content__list">
                {/* 可以使用 map 遍歷渲染 */}
                <div className="coupon-content__item">
                  <div className="container">
                    <div className="row row-cols-lg-3">
                      {data.map((v, i) => {
                        return <UsedCoupon key={v.id} coupon={v} />
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="can_be_used" title="可使用">
              <div className="coupon-content__list">
                {/* 可以使用 map 遍歷渲染 */}
                <div className="coupon-content__item">
                  <div className="container">
                    <div className="row row-cols-lg-3">
                      {data.map((v, i) => {
                        const now = Date.parse(new Date())
                        const coupon_end = Date.parse(new Date(v.end_at))
                        // 優惠券還有效 && 會員持有還有效
                        if (
                          v.valid ===
                            1 /* 這個是member_coupon資料裡的 會員存在的優惠劵 */ &&
                          v.coupon_valid !==
                            0 /* 這個是mycoupon資料裡的 有效的優惠劵 */ &&
                          v.used_valid !==
                            0 /* 這個是member_coupon資料裡的 會員裡未使用的優惠劵 */ &&
                          coupon_end >= now
                        )
                          return <UsedCoupon key={v.id} coupon={v} />
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="contact" title="已使用/已逾期">
              <div className="coupon-content__list">
                {/* 可以使用 map 遍歷渲染 */}
                <div className="coupon-content__item">
                  <div className="container">
                    <div className="row row-cols-lg-3">
                      {data.map((v, i) => {
                        const now = Date.parse(new Date())
                        const coupon_end = Date.parse(new Date(v.end_at))
                        // 會員還能使用 但 優惠券已無效 或 超過時間期限
                        if (
                          v.valid === 1 &&
                          (v.used_valid === 0 ||
                            v.coupon_valid === 0 ||
                            coupon_end < now)
                        )
                          return <UsedCoupon key={v.id} coupon={v} />
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            {/* <Tab eventKey="contact" title="已使用" disabled>
              Tab content for Contact
            </Tab> */}
          </Tabs>
        </div>
      </div>

      <style jsx>{`
        .coupon-container {
          background-color: #f6f5f3;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 60px;
        }
        @media (max-width: 991px) {
          .coupon-container {
            padding: 0 20px;
          }
        }
        .coupon-content {
          display: flex;
          margin-top: 26px;
          width: 100%;
          max-width: 1200px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .coupon-content {
            max-width: 100%;
          }
        }
        .coupon-content__title {
          border-bottom: 1px solid #eae8e4;
          color: #19110b;
          white-space: nowrap;
          text-transform: uppercase;
          padding: 5px 0 31px;
          font: 700 26px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .coupon-content__title {
            max-width: 100%;
            white-space: initial;
          }
        }
        .coupon-content__list {
          justify-content: center;
          background-color: #fff;
          display: flex;
          margin-top: 42px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .coupon-content__list {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .coupon-content__item {
          background-color: #fff;
        }
        .col {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 991px) {
          .coupon-content__item {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}

export default CouponPage
