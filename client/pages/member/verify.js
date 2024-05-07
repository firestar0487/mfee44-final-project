import { useRouter } from 'next/router'
import React, { useState } from 'react'

function AccountActivation() {
  const router = useRouter()
  const { email } = router.query // 從路由中獲取 URL 參數
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleActivation = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3005/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }), // 使用 URL 中的 email 參數
      })
      const data = await response.json()
      setMessage(data.message)
      if (response.ok) {
        // 跳轉至會員中心頁面
        router.push('/member/profile')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <div>
        <div className="account-setup">
          <div className="account-column">
            <div className="account-box">
              <div className="account-content">
                <div className="account-title">建立個人帳號</div>
                <div className="activation-instruction">啓用帳號</div>
                <div className="activation-details">
                  <div className="activation-message">
                    請輸入已傳送到電子信箱
                    <span> {email} </span>
                    的啓用帳號金鑰以啓用帳號
                  </div>
                  <div className="key-label">啟用帳號金鑰 *</div>
                  <form onSubmit={handleActivation}>
                    <input
                      className="key-input-area"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="輸入驗證碼"
                      required
                    />
                    <button className="activation-button" type="submit">
                      啓用帳號
                    </button>
                  </form>
                  {message && <div>{message}</div>}
                  <div className="resend-option">重新傳送?</div>
                </div>
              </div>
            </div>
          </div>
          <div className="side-column">
            <div className="customer-service-section">
              <div className="customer-service-info">
                <div className="customer-service-title">客戶服務中心</div>
                <div className="phone-section">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f1408679e546d6106634c9836ccd6aa22b492380fc084d1785b92c52b69573f?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                    className="phone-icon"
                  />
                  <div className="phone-number">0080 000 0000</div>
                </div>
                <div className="contact-email">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/97a2fa3d751ef0aee22c4677e1280fa0490622bb61e59f8700546e2e5487bc85?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                    className="email-icon"
                  />
                  <div className="email-contact">以電子郵件聯絡我們</div>
                </div>
              </div>
              <div className="account-benefits">
                <div className="benefits-title">建立 個人帳號，您可以</div>
                <div className="benefit-item">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd0a53b707dd9562128b7376bd48109aa29a04a14cad7fed39f3660e0edf36b5?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                    className="benefit-icon"
                  />
                  <div className="benefit-description">
                    有關您的線上訂購，購買記錄
                    <br />
                    及收據。
                  </div>
                </div>
                <div className="benefit-item1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/57cb4de8462c4ce9a5c966a2593759687f8f55aa71f61f56357736c32a007c66?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                    className="benefit-icon"
                  />
                  <div className="benefit-description">管理您的個人資料</div>
                </div>
                <div className="benefit-item2">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2c1230f32863e8bf0c91e711da73955b03a5abc77f1776cbc1d561a01bb990b?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                    className="benefit-icon"
                  />
                  <div className="benefit-description">
                    接收墨韻雅筆最新通知
                  </div>
                </div>
                <div className="benefit-item3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/98e950e0dc09a984a66f8b23d8ece3d228bfe68179ed4a466c97fde468446b06?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                    className="benefit-icon"
                  />
                  <div className="benefit-description">
                    儲存您的願望錄以便在其他平台瀏覽
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .account-setup {
            gap: 20px;
            display: flex;
            margin-bottom: 30px;
          }
          @media (max-width: 991px) {
            .account-setup {
              flex-direction: column;
              align-items: stretch;
              gap: 0px;
            }
          }
          .account-column {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 60%;
            margin-left: 0px;
          }
          @media (max-width: 991px) {
            .account-column {
              width: 100%;
            }
          }
          .account-box {
            background-color: #f6f5f3;
            display: flex;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
            color: #19110b;
            font-weight: 700;
            width: 100%;
            padding: 44px 20px;
          }
          @media (max-width: 991px) {
            .account-box {
              max-width: 100%;
              padding: 0 0px;
            }
          }
          .account-content {
            display: flex;
            width: 720px;
            max-width: 100%;
            flex-direction: column;
          }
          .account-title {
            border-bottom: 1px solid #eae8e4;
            justify-content: center;
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: -0.6px;
            padding: 21px 0;
            font: 34px/106% Inter, sans-serif;
          }
          @media (max-width: 991px) {
            .account-title {
              max-width: 100%;
              white-space: initial;
            }
          }
          .activation-instruction {
            letter-spacing: 0.2px;
            text-transform: uppercase;
            margin-top: 30px;
            font: 23px/100% Inter, sans-serif;
          }
          @media (max-width: 991px) {
            .activation-instruction {
              max-width: 100%;
            }
          }
          .activation-details {
            background-color: #fff;
            display: flex;
            margin-top: 40px;
            flex-direction: column;
            font-size: 14px;
            font-weight: 300;
            padding: 36px 31px;
          }
          @media (max-width: 991px) {
            .activation-details {
              max-width: 100%;
              padding-left: 20px;
            }
          }
          .activation-message {
            letter-spacing: 1px;
            font: 18px/28px Inter, sans-serif;
          }
          @media (max-width: 991px) {
            .activation-message {
              max-width: 100%;
            }
          }
          .key-label {
            color: #2e2e2e;
            font-family: Inter, sans-serif;
            line-height: 178%;
            text-transform: uppercase;
            margin-top: 20px;
          }
          @media (max-width: 991px) {
            .key-label {
              max-width: 100%;
              margin-top: 40px;
            }
          }
          .key-input-area {
            font-family: Inter, sans-serif;
            justify-content: center;
            align-items: start;
            border: 1px solid #eae8e4;
            background-color: #fff;
            white-space: nowrap;
            letter-spacing: 0.4px;
            margin: 10px 10px 0 0;
            padding: 19px 19px 19px 17px;
          }
          @media (max-width: 991px) {
            .key-input-area {
              white-space: initial;
              max-width: 100%;
              margin-right: 10px;
              padding-right: 20px;
            }
          }
          .resend-option {
            letter-spacing: 0.8px;
            text-decoration-line: underline;
            margin-top: 26px;
            font: 500 16px/150% Inter, sans-serif;
          }
          @media (max-width: 991px) {
            .resend-option {
              max-width: 100%;
            }
          }
          .activation-button {
            justify-content: center;
            align-items: center;
            background-color: #19110b;
            align-self: end;
            margin-top: 32px;
            width: 240px;
            max-width: 100%;
            color: #fff;
            white-space: nowrap;
            text-align: center;
            padding: 17px 60px;
            font: 400 16px Inter, sans-serif;
          }
          @media (max-width: 991px) {
            .activation-button {
              white-space: initial;
              padding: 0 20px;
            }
          }
          .side-column {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: 33%;
            margin-left: 20px;
          }
          @media (max-width: 991px) {
            .side-column {
              width: 100%;
            }
          }
          .customer-service-section {
            background-color: #fff;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            width: 100%;
            padding: 30px 30px 50px;
          }
          @media (max-width: 991px) {
            .customer-service-section {
              max-width: 100%;
              padding: 0 20px;
            }
          }
          .customer-service-info {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            color: #2e2e2e;
            font-weight: 300;
            padding: 18px 10px 10px;
          }
          .customer-service-title {
            color: #000;
            text-transform: uppercase;
            font: 600 12px/100% Inter, sans-serif;
          }
          .phone-section {
            border-top: 1px solid #eae8e4;
            display: flex;
            margin-top: 24px;
            justify-content: space-between;
            gap: 10px;
            font-size: 14px;
            letter-spacing: 0.8px;
            line-height: 170%;
            padding: 17px 0;
          }
          .phone-icon {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 22px;
          }
          .phone-number {
            font-family: Inter, sans-serif;
            flex-grow: 1;
            flex-basis: auto;
            margin: auto 0;
          }
          .contact-email {
            border-top: 1px solid #eae8e4;
            display: flex;
            justify-content: space-between;
            gap: 15px;
            font-size: 15px;
            white-space: nowrap;
            letter-spacing: 0.8px;
            line-height: 163%;
            padding: 20px 0;
          }
          @media (max-width: 991px) {
            .contact-email {
              white-space: initial;
            }
          }
          .email-icon {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 17px;
          }
          .email-contact {
            font-family: Inter, sans-serif;
            flex-grow: 1;
            flex-basis: auto;
          }
          .account-benefits {
            background-color: #f6f5f3;
            display: flex;
            margin-top: 30px;
            flex-direction: column;
            font-size: 16px;
            color: #19110b;
            font-weight: 400;
            padding: 30px 24px;
          }
          @media (max-width: 991px) {
            .div-31 {
              padding: 0 20px;
            }
          }
          .benefits-title {
            text-transform: uppercase;
            font: 700 18px/111% Inter, sans-serif;
          }
          .benefit-item {
            display: flex;
            margin-top: 35px;
            justify-content: space-between;
            gap: 20px;
            white-space: nowrap;
            letter-spacing: 0.4px;
            line-height: 20px;
          }
          @media (max-width: 991px) {
            .benefit-item {
              white-space: initial;
            }
          }
          .benefit-icon {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 16px;
            margin: auto 0;
          }
          .benefit-description {
            font-family: Inter, sans-serif;
            flex-grow: 1;
            flex-basis: auto;
          }
          .benefit-item1 {
            border-top: 1px solid #eae8e4;
            display: flex;
            margin-top: 19px;
            justify-content: space-between;
            gap: 20px;
            white-space: nowrap;
            letter-spacing: 0.4px;
            padding: 19px 0;
          }
          @media (max-width: 991px) {
            .benefit-item1 {
              white-space: initial;
            }
          }
          .benefit-icon {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 16px;
          }
          .benefit-description {
            font-family: Inter, sans-serif;
            flex-grow: 1;
            flex-basis: auto;
          }
          .benefit-item2 {
            border-top: 1px solid #eae8e4;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            letter-spacing: 0.4px;
            line-height: 20px;
            padding: 9px 0;
          }
          .benefit-icon {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 16px;
            margin: auto 0;
          }
          .benefit-description {
            font-family: Inter, sans-serif;
            flex-grow: 1;
            flex-basis: auto;
          }
          .benefit-item3 {
            border-top: 1px solid #eae8e4;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            white-space: nowrap;
            letter-spacing: 0.4px;
            padding: 19px 0 2px;
          }
          @media (max-width: 991px) {
            .benefit-item3 {
              white-space: initial;
            }
          }
          .benefit-icon {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 16px;
          }
          .benefit-description {
            font-family: Inter, sans-serif;
            flex-grow: 1;
            flex-basis: auto;
          }
        `}
      </style>
    </>
  )
}

export default AccountActivation
