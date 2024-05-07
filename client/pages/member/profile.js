import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

import ProductCard from '@/components/myProduct/favorites'

const MemberProfile = () => {
  useAuth() // 在組件開始處調用 useAuth 進行身份驗證

  const [user, setUser] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: '',
    year: '',
    month: '',
    day: '',
  })
  const [loading, setLoading] = useState(true)

  // 定義年份、月份、日期的選項數組
  const years = Array.from(
    new Array(100),
    (_, index) => new Date().getFullYear() - index
  )
  const months = Array.from(new Array(12), (_, index) => index + 1)
  const days = Array.from(new Array(31), (_, index) => index + 1)

  // 在組件掛載時獲取用戶數據
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/profile', {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        const newUser = {
          ...data,
          year: data.birthdate ? data.birthdate.split('-')[0] : '',
          month: data.birthdate ? data.birthdate.split('-')[1] : '',
          day: data.birthdate ? data.birthdate.split('-')[2] : '',
        }

        setUser(newUser)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // 處理表單字段更改
  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  // 保存個人資料更改
  const handleSaveProfile = async () => {
    const birthdate = `${user.year}-${user.month.padStart(
      2,
      '0'
    )}-${user.day.padStart(2, '0')}`

    const profileData = {
      ...user,
      birthdate,
    }

    try {
      const response = await fetch('http://localhost:3005/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      alert('個人檔案已更新！')
      window.location.reload()
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('更新個人檔案時發生錯誤。')
    }
  }

  if (loading) return <div>Loading...</div>

  const birthdateSet = !!user.birthdate
  return (
    <>
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">我的個人檔案</div>
          <div className="profile-content"></div>
          <div className="details-wrapper">
            <div className="details-section">
              <div className="column">
                <div className="section-header">
                  <div className="header-title">個人資料</div>
                  <div className="personal-info">
                    <div className="field-title">稱謂*</div>
                    <select
                      className="input-title"
                      value={user.title}
                      name="title"
                      onChange={handleChange}
                    >
                      <option value="mr">先生</option>
                      <option value="ms">女士</option>
                      <option value="preferNotToSay">不願透露</option>
                    </select>
                    <div className="field-firstname">姓氏*</div>
                    <input
                      type="text"
                      className="input-firstname"
                      value={user.firstname}
                      name="firstname"
                      onChange={handleChange}
                    />
                    <div className="field-lastname">名字*</div>
                    <input
                      type="text"
                      className="input-lastname"
                      value={user.lastname}
                      name="lastname"
                      onChange={handleChange}
                    />
                    <div className="field-email">電子郵件</div>
                    <div className="input-email">{user.email}</div>{' '}
                    {/* 假設電子郵件不可更改 */}
                    <div className="field-password">密碼</div>
                    <button className="change-password">更改</button>
                    <div className="field-birthday">出生日期</div>
                    <div className="date-picker">
                      <select
                        className="date-picker-select"
                        name="year"
                        value={user.year}
                        onChange={handleChange}
                        disabled={birthdateSet}
                      >
                        <option value="">年</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        className="date-picker-select"
                        name="month"
                        value={user.month}
                        onChange={handleChange}
                        disabled={birthdateSet}
                      >
                        <option value="">月</option>
                        {months.map((month) => (
                          <option
                            key={month}
                            value={month < 10 ? `0${month}` : `${month}`}
                          >
                            {month < 10 ? `0${month}` : `${month}`}
                          </option>
                        ))}
                      </select>
                      <select
                        className="date-picker-select"
                        name="day"
                        value={user.day}
                        onChange={handleChange}
                        disabled={birthdateSet}
                      >
                        <option value="">日</option>
                        {days.map((day) => (
                          <option
                            key={day}
                            value={day < 10 ? `0${day}` : `${day}`}
                          >
                            {day < 10 ? `0${day}` : day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field-phone">電話號碼</div>
                    <input
                      type="text"
                      className="input-phone"
                      value={user.phone}
                      name="phone"
                      onChange={handleChange}
                    />
                    <button
                      className="save-profile"
                      onClick={handleSaveProfile}
                    >
                      儲存我的個人檔案
                    </button>
                  </div>
                </div>
              </div>
              <div className="section-additional">
                <div className="additional-info">
                  <div className="category-address">
                    <div className="title-address d-flex">
                      <p className="mb-0 me-4">我的收藏</p>
                      <Link
                        href="http://localhost:3000/course/collection"
                        className="mb-0"
                      >
                        <p className="mb-0">課程收藏</p>
                      </Link>
                    </div>

                    <div
                      className="card border-0 "
                      style={{
                        width: '400px',
                        height: 'auto',
                        display: 'inline-block',
                        margin: '0 10px',
                      }}
                    >
                      <ProductCard />
                    </div>

                    {/* <div className="no-address">沒有已儲存地址</div> */}
                    {/* <div className="add-address">新增地址</div> */}
                  </div>

                  <div className="category-orders">
                    <div className="title-orders">我的訂單</div>
                    <div className="no-orders"></div>
                    <div className="start-shopping">
                      <Link
                        href="http://localhost:3000/member/orders"
                        className="mb-0"
                      >
                       <div className="text-my-white">查看訂單</div>
                      </Link>
                    </div>
                  </div>
                  <div className="category-coupons">
                    <div className="title-coupons">查看優惠卷</div>
                    <div className="start-shopping">
                      <Link
                        href="http://localhost:3000/member/Mycoupon"
                        className="mb-0"
                      >
                       <div className="text-my-white">我的優惠卷</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .date-picker-select {
          height: 3rem;
          border: 1px solid #eae8e4;
          font-size: 1rem;
          padding: 0 2rem 0 1rem;
          -webkit-appearance: none; /* 針對 Safari 和 Chrome */
          -moz-appearance: none; /* 針對 Firefox */
          appearance: none; /* 標準語法 */
        }
        .profile-page {
          background-color: #f6f5f3;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 45px 60px;
        }
        @media (max-width: 991px) {
          .profile-page {
            padding: 0 20px;
          }
        }
        .profile-container {
          display: flex;
          width: 100%;
          max-width: 1201px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .profile-container {
            max-width: 100%;
          }
        }
        .profile-header {
          color: #19110b;
          text-transform: uppercase;
          z-index: 10;
          font: 700 26px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .profile-header {
            max-width: 100%;
          }
        }
        .profile-content {
          border-bottom: 1px solid #eae8e4;
          height: 31px;
        }
        @media (max-width: 991px) {
          .profile-content {
            max-width: 100%;
          }
        }
        .details-wrapper {
          margin-top: 47px;
        }
        @media (max-width: 991px) {
          .details-wrapper {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .details-section {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .details-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .section-header {
          background-color: #fff;
          display: flex;
          flex-grow: 1;
          padding-bottom: 28px;
          flex-direction: column;
          width: 100%;
        }
        @media (max-width: 991px) {
          .section-header {
            max-width: 100%;
            margin-top: 15px;
          }
        }
        .header-title {
          align-items: start;
          border-bottom: 0.75px solid #e1dfd8;
          justify-content: center;
          color: #19110b;
          white-space: nowrap;
          padding: 28px 60px 28px 24px;
          font: 400 16px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .header-title {
            max-width: 100%;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .personal-info {
          display: flex;
          margin-top: 11px;
          flex-direction: column;
          padding: 0 31px;
        }
        @media (max-width: 991px) {
          .personal-info {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .field-title {
          color: #19110b;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .field-title {
            max-width: 100%;
          }
        }
        .input-title {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 11px;
          width: 528px;
          max-width: 100%;
          height: 48px;
          padding: 0px 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .field-firstname {
          color: #19110b;
          margin-top: 27px;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .field-firstname {
            max-width: 100%;
          }
        }
        .input-firstname {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 11px;
          width: 528px;
          max-width: 100%;
          height: 48px;
          padding: 0px 10px;
        }
        .field-lastname {
          color: #19110b;
          margin-top: 27px;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .field-lastname {
            max-width: 100%;
          }
        }
        .input-lastname {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 11px;
          width: 528px;
          max-width: 100%;
          height: 48px;
          padding: 0px 10px;
        }
        .field-email {
          color: #19110b;
          margin-top: 21px;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .field-email {
            max-width: 100%;
          }
        }
        .input-email {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 11px;
          width: 528px;
          max-width: 100%;
          height: 48px;
          padding: 10px 10px;
        }
        .field-password {
          color: #19110b;
          margin-top: 16px;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .field-password {
            max-width: 100%;
          }
        }
        .change-password {
          justify-content: center;
          border-radius: 50px;
          background-color: #7c7477;
          align-self: start;
          margin-top: 11px;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          padding: 19px 24px;
          font: 400 14px Inter, sans-serif;
          border: 1px solid #7c7477;
          transition: background-color 0.3s, color 0.3s;
        }
        .change-password:hover {
          background-color: white;
          color: black;
        }
        @media (max-width: 991px) {
          .change-password {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .field-birthday {
          color: #19110b;
          margin-top: 17px;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .field-birthday {
            max-width: 100%;
          }
        }
        .date-picker {
          align-self: start;
          display: flex;
          margin-top: 10px;
          gap: 10px;
        }
        .picker-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          height: 48px;
          width: 528px;
        }
        .field-phone {
          color: #19110b;
          margin-top: 12px;
          font: 400 13px/143% Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-25 {
            max-width: 100%;
          }
        }
        .input-phone {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 11px;
          width: 128px;
          max-width: 100%;
          height: 48px;
          padding: 0px 10px;
        }
        .save-profile {
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          border: 1px solid #7c7477;
          background-color: #7c7477;
          margin-top: 24px;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          padding: 19px 60px;
          font: 400 14px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .save-profile {
            max-width: 100%;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .section-additional {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .section-additional {
            width: 100%;
          }
        }
        .additional-info {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 16px;
          color: #19110b;
          font-weight: 400;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .additional-info {
            max-width: 100%;
            margin-top: 16px;
            white-space: initial;
          }
        }
        .category-address {
          width: 100%;
          padding-bottom: 34px;
          align-items: center;
          background-color: #fff;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .category-address {
            max-width: 100%;
            white-space: initial;
          }
        }
        .title-address {
          font-family: Inter, sans-serif;
          align-items: start;
          border-bottom: 0.75px solid #e1dfd8;
          align-self: stretch;
          justify-content: center;
          padding: 28px 60px 28px 24px;
        }
        @media (max-width: 991px) {
          .title-address {
            max-width: 100%;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .no-address {
          font-family: Inter, sans-serif;
          font-weight: 300;
          line-height: 178%;
          margin-top: 24px;
        }
        .add-address {
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          background-color: #7c7477;
          margin-top: 26px;
          width: 241px;
          max-width: 100%;
          color: #fff;
          text-align: center;
          padding: 19px 60px;
          font: 14px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .add-address {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .category-orders {
          padding-bottom: 34px;
          align-items: center;
          background-color: #fff;
          display: flex;
          margin-top: 73px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .category-orders {
            max-width: 100%;
            margin-top: 40px;
            white-space: initial;
          }
        }
        .title-orders {
          font-family: Inter, sans-serif;
          align-items: start;
          border-bottom: 0.75px solid #e1dfd8;
          align-self: stretch;
          justify-content: center;
          padding: 28px 60px 28px 24px;
        }
        @media (max-width: 991px) {
          .title-orders {
            max-width: 100%;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .no-orders {
          text-align: center;
          font-family: Inter, sans-serif;
          font-weight: 300;
          line-height: 178%;
          margin-top: 24px;
        }
        .start-shopping {
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          background-color: #7c7477;
          margin-top: 26px;
          width: 241px;
          max-width: 100%;
          color: #fff;
          text-align: center;
          padding: 19px 60px;
          font: 14px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .start-shopping {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .category-coupons {
          padding-bottom: 34px;
          align-items: center;
          background-color: #fff;
          display: flex;
          margin-top: 72px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .category-coupons {
            max-width: 100%;
            margin-top: 40px;
            white-space: initial;
          }
        }
        .title-coupons {
          font-family: Inter, sans-serif;
          align-items: start;
          border-bottom: 0.75px solid #e1dfd8;
          align-self: stretch;
          justify-content: center;
          padding: 28px 60px 28px 24px;
        }
        @media (max-width: 991px) {
          .title-coupons {
            max-width: 100%;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .no-coupons {
          text-align: center;
          font-family: Inter, sans-serif;
          font-weight: 300;
          line-height: 178%;
          margin-top: 24px;
        }
        .get-coupons {
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          background-color: #7c7477;
          margin-top: 26px;
          width: 241px;
          max-width: 100%;
          color: #fff;
          text-align: center;
          padding: 19px 60px;
          font: 14px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .get-coupons {
            white-space: initial;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  )
}

export default MemberProfile
