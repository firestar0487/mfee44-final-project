import React, { useState } from 'react'
import InventorySearch from '@/components/myService/inventorySearch'

export default function Support() {
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    reservationDate: '',
    serviceType: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e, serviceType) => {
    e.preventDefault()
    // 更新 formData，包含服務項目信息
    const updatedFormData = { ...formData, serviceType } // 更新 formData，包含服務項目信息
    // 發送表單數據到後端
    fetch('http://localhost:3005/api/service/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData), // 使用更新后的 formData
    })
      .then((response) => {
        if (response.ok) {
          // 表單成功提交，顯示成功消息或重定向等
          alert('用戶預約成功。通知郵件已發送。')
          setFormData({
            userName: '',
            userPhone: '',
            userEmail: '',
            reservationDate: '',
          })
          window.location.reload()
        } else {
          // 表單提交失敗，顯示錯誤消息等
          alert('預約過程中發生錯誤。')
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error)
        // 顯示錯誤消息
        alert('預約過程中發生錯誤。')
      })
  }

  return (
    <>
      {/* 背景動畫 */}
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      {/* 頁面用途簡介 */}
      <InventorySearch />
      <div className="row direction mb-3 bg-my-white">
        <div className="col">
          <h1 className="text-h1">線上預約</h1>
          <ul>
            <li className="animated1 animatedFadeInUp fadeInUp">
              <span className="text-my-notice">政策和條款：</span>
              預約到府服務時，請務必閱讀並了解我們的政策和條款，包括付款方式、取消政策和責任聲明等內容。
            </li>
            <li className="animated2 animatedFadeInUp fadeInUp">
              <span className="text-my-notice">客戶滿意度：</span>
              我們重視每一位客戶的滿意度。如果您對我們的服務有任何建議或意見，請隨時與我們聯系，我們將竭誠為您服務。
            </li>
            <li className="animated3 animatedFadeInUp fadeInUp">
              <span className="text-my-notice">取消或修改預約：</span>
              如果您需要取消或修改預約，請提前通知我們，以便我們能夠為其他客戶提供時間段。您可以在預約確認郵件中找到相關的聯系方式。
            </li>
          </ul>
          {/* 政策和條款： 預約服務時，請務必閱讀並了解我們的政策和條款，包括付款方式、取消政策和責任聲明等內容。 */}
          {/* 客戶滿意度： 我們重視每一位客戶的滿意度。如果您對我們的服務有任何建議或意見，請隨時與我們聯系，我們將竭誠為您服務。 */}
          {/* 取消或修改預約： 如果您需要取消或修改預約，請提前通知我們，以便我們能夠為其他客戶提供時間段。您可以在預約確認郵件中找到相關的聯系方式。 */}
        </div>
      </div>
      {/* 3種服務 */}
      <div className="card-row row g-0 mb-5 bg-my-white">
        <div className="col-md-4 img-div">
          <img
            src="/images/myService/64650.jpg"
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-7 px-4 flex-grow-1">
          <div className="card-body">
            <h4 className="card-title mb-2 py-2 text-h2">維修</h4>
            <form onSubmit={(e) => handleSubmit(e, '維修')}>
              <div>
                {/* 姓名 */}
                <label htmlFor="userName">姓名</label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* 電話 */}
                <label htmlFor="userPhone">電話</label>
                <input
                  className="form-control"
                  type="phone"
                  id="userPhone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* 電子郵件 */}
                <label htmlFor="userEmail">電子郵件</label>
                <input
                  className="form-control"
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
              </div>
              <input
                className="m-2"
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-secondary my-2">
                立即預約
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="card-row row g-0 mb-5 bg-my-white">
        <div className="col-md-4 img-div">
          <img
            src="/images/myService/16719.jpg"
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-7 px-4 flex-grow-1">
          <div className="card-body">
            <h4 className="card-title mb-2 py-2 text-h2">保養</h4>
            <form onSubmit={(e) => handleSubmit(e, '保養')}>
              <div>
                {/* 姓名 */}
                <label htmlFor="userName">姓名</label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* 電話 */}
                <label htmlFor="userPhone">電話</label>
                <input
                  className="form-control"
                  type="phone"
                  id="userPhone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* 電子郵件 */}
                <label htmlFor="userEmail">電子郵件</label>
                <input
                  className="form-control"
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
              </div>
              <input
                className="m-2"
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-secondary my-2">
                立即預約
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="card-row row g-0 mb-5 bg-my-white">
        <div className="col-md-4 img-div">
          <img
            src="/images/myService/79216.jpg"
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-7 px-4 flex-grow-1">
          <div className="card-body">
            <h4 className="card-title mb-2 py-2 text-h2">訂製</h4>
            <form onSubmit={(e) => handleSubmit(e, '訂製')}>
              <div>
                {/* 姓名 */}
                <label htmlFor="userName">姓名</label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* 電話 */}
                <label htmlFor="userPhone">電話</label>
                <input
                  className="form-control"
                  type="phone"
                  id="userPhone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* 電子郵件 */}
                <label htmlFor="userEmail">電子郵件</label>
                <input
                  className="form-control"
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
              </div>
              <input
                className="m-2"
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-secondary my-2">
                立即預約
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card-row {
          border: 1px solid black;
          border-radius: 10px;
          margin: 0 auto;
          max-width: 50vw;

          box-shadow: -10px 10px 0px 0px rgba(33, 33, 33, 1),
            -20px 20px 0px 0px rgba(33, 33, 33, 0.7),
            -30px 30px 0px 0px rgba(33, 33, 33, 0.4),
            -40px 40px 0px 0px rgba(33, 33, 33, 0.1);
        }

        .direction {
          margin: 0 auto;
          padding: 5px;
          text-align: center;
          border: 1px solid black;
        }

        .direction ul {
          text-align: center;
          list-style: none;
        }
        @media screen and (max-width: 391px) {
          .direction ul {
            padding: 0;
            text-align: start;
            & li {
              margin-bottom: 5px;
              border-bottom: 1px dashed black;
            }
          }
        }

        .card-title {
          border-bottom: 1px solid black;
        }

        .img-div {
          overflow: hidden;
        }

        .img-div img {
          object-fit: cover;
          width: auto;
          height: 100%;
        }
        /* 動畫 */
        .bg {
          animation: slide 5s ease-in-out infinite alternate;
          background-image: linear-gradient(220deg, #929292 50%, #404040 50%);
          bottom: 0;
          left: -50%;
          opacity: 0.5;
          position: fixed;
          right: -50%;
          top: 0;
          z-index: -1;
        }

        .bg2 {
          animation-direction: alternate-reverse;
          animation-duration: 4s;
        }

        .bg3 {
          animation-duration: 5s;
        }

        h1 {
          font-family: 'Noto Serif TC', 'Noto Sans TC Regular', Helvetica, Arial,
            'PingFang TC', '苹方-繁', 'Heiti TC', '黑體-繁',
            'Microsoft JhengHei', '微軟正黑體', system-ui, -apple-system,
            'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
            'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol', 'Noto Color Emoji';
        }

        @keyframes slide {
          0% {
            transform: translateX(-25%);
          }

          100% {
            transform: translateX(25%);
          }
        }
        /* 動畫 */

        .animated1 {
          animation-duration: 1s;
          animation-fill-mode: both;
          -webkit-animation-duration: 1s;
          -webkit-animation-fill-mode: both;
        }
        .animated2 {
          animation-delay: 1s;
          animation-duration: 1s;
          animation-fill-mode: both;
          -webkit-animation-duration: 1s;
          -webkit-animation-fill-mode: both;
        }
        .animated3 {
          animation-delay: 2s;
          animation-duration: 1s;
          animation-fill-mode: both;
          -webkit-animation-duration: 1s;
          -webkit-animation-fill-mode: both;
        }

        .animatedFadeInUp {
          opacity: 0;
        }

        .fadeInUp {
          opacity: 0;
          animation-name: fadeInUp;
          -webkit-animation-name: fadeInUp;
        }
        @keyframes fadeInUp {
          from {
            transform: translate3d(0, 40px, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
