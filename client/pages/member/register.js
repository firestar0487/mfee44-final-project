import React, { useState } from 'react'
import { usePasswordValidation } from '@/components/member/usePasswordValidation'
import { useEmailValidation } from '@/components/member/useEmailValidation'

function RegistrationPage() {
  const {
    password,
    showRules,
    ruleChecks,
    handlePasswordChange,
    handleFocus,
    handleBlur,
  } = usePasswordValidation()
  const {
    email,
    confirmEmail,
    emailValid,
    isEmailMatch,
    handleEmailChange,
    handleConfirmEmailChange,
  } = useEmailValidation()
  const [title, setTitle] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const renderRuleCheck = (check, message) => (
    <li style={{ color: check ? 'green' : 'red' }}>{message}</li>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!emailValid || !isEmailMatch) {
      alert('請填寫有效的電子郵件且兩次輸入的郵箱必須相同。')
      setIsLoading(false)
      return
    }

    const registrationData = {
      email,
      password,
      title,
      lastname,
      firstname,
    }

    try {
      const response = await fetch('http://localhost:3005/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
        credentials: 'include',
      })

      const responseData = await response.json()
      if (response.ok) {
        // 註冊成功後，將 JWT 儲存在 localStorage 中
        console.log('註冊成功，響應信息:', responseData)
        localStorage.setItem('token', responseData.token)
        window.location.href = `/member/verify?email=${email}`
      } else {
        console.error('註冊失敗:', responseData.message)
        alert(`註冊失敗: ${responseData.message}`)
      }
    } catch (error) {
      console.error('網絡或伺服器錯誤:', error)
      alert('網絡錯誤，請稍後重試。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="signup-container">
        <div className="main-column">
          <div className="account-section">
            <form className="registration-section" onSubmit={handleSubmit}>
              <div className="registration-title text-h2">建立個人帳號</div>
              <div className="login-info-part1">登入資料(1/3)</div>
              <div className="email-section">
                <div className="email-label">電子郵件 *</div>
                <input
                  type="email"
                  className="email-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  required
                />
                {!emailValid && (
                  <div style={{ color: 'red' }}>請填寫有效的電子郵件</div>
                )}
                <div className="email-confirm-label">確認電子郵件 *</div>
                <input
                  type="email"
                  className="email-confirm-input"
                  placeholder="name@example.com"
                  value={confirmEmail}
                  onChange={(e) => handleConfirmEmailChange(e.target.value)}
                  required
                />
                {!isEmailMatch && (
                  <div style={{ color: 'red' }}>電子信箱有誤</div>
                )}
              </div>
              <div className="login-info-part2">登入資料(2/3)</div>
              <div className="password-section">
                <div className="password-label">密碼 *</div>
                <input
                  type="password"
                  className="password-input"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                {showRules && (
                  <ul>
                    {renderRuleCheck(
                      ruleChecks.minLength,
                      '密碼至少包含8個字符'
                    )}
                    {renderRuleCheck(ruleChecks.hasNumber, '至少包含一個數字')}
                    {renderRuleCheck(
                      ruleChecks.hasUppercase,
                      '至少包含一個大寫字母'
                    )}
                    {renderRuleCheck(
                      ruleChecks.hasLowercase,
                      '至少包含一個小寫字母'
                    )}
                  </ul>
                )}
              </div>
              <div className="personal-info">您的個人資料(3/3)</div>
              <div className="personal-info-section">
                <div className="title-label">稱謂 *</div>
                <select
                  id="title"
                  className="title-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    選擇稱謂
                  </option>
                  <option value="mr">男士</option>
                  <option value="ms">女士</option>
                  <option value="preferNotToSay">不方便透露</option>
                </select>
                <div className="firstname-label">姓氏 *</div>
                <input
                  type="text"
                  id="firstname"
                  className="firstname-input"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <div className="lastname-label">名字 *</div>
                <input
                  type="text"
                  id="lastname"
                  className="lastname-input"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="next-section"
                disabled={isLoading}
              >
                {isLoading ? '提交中...' : '下一部分'}
              </button>
            </form>
          </div>
        </div>
        <div className="side-column">
          <div className="customer-service-section">
            <div className="customer-service-info">
              <div className="customer-service-title">客戶服務中心</div>
              <div className="phone-section">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6eb318f507762af9c2d2f5cfd5eaca2de44f46b3e3c70f513a241fd0c8f756d?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
                  className="phone-icon"
                />
                <div className="phone-number">0080 000 0000</div>
              </div>
              <div className="contact-email">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe9debb8f9ad76f3b50dad3f97b6585e5b031c08e9ef2b0b602cedc5e23b791f?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
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
                  有關您的線上訂購，購買記錄及收據。
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
                <div className="benefit-description">接收墨韻雅筆最新通知</div>
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
      <style jsx>{`
        .signup-container {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .container {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }

        .main-column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 0px;
        }

        @media (max-width: 991px) {
          .main-column {
            width: 100%;
          }
        }

        .account-section {
          background-color: #f6f5f3;
          display: flex;
          flex-grow: 1;
          justify-content: center;
          align-items: center;
          font-size: 23px;
          color: #19110b;
          font-weight: 700;
          line-height: 100%;
          width: 100%;
          padding: 44px 6px;
        }

        @media (max-width: 991px) {
          .account-section {
            max-width: 100%;
            padding: 0 20px;
          }
        }

        .registration-section {
          display: flex;
          width: 720px;
          max-width: 100%;
          flex-direction: column;
        }

        .registration-title {
          border-bottom: 1px solid #eae8e4;
          justify-content: center;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: -0.6px;
          padding: 21px 0;
          font: 33px/109% Inter, sans-serif;
        }

        @media (max-width: 991px) {
          .registration-title {
            max-width: 100%;
            white-space: initial;
          }
        }

        .login-info-part1 {
          font-family: Inter, sans-serif;
          letter-spacing: 0.2px;
          text-transform: uppercase;
          margin-top: 21px;
        }

        @media (max-width: 991px) {
          .login-info-part1 {
            max-width: 100%;
          }
        }

        .email-section {
          background-color: #fff;
          display: flex;
          margin-top: 21px;
          flex-direction: column;
          font-size: 14px;
          color: #2e2e2e;
          font-weight: 300;
          text-transform: uppercase;
          line-height: 178%;
          padding: 22px 32px;
        }

        @media (max-width: 991px) {
          .email-section {
            max-width: 100%;
            padding: 10px 20px;
          }
        }

        .email-label {
          font-family: Inter, sans-serif;
          padding-top: 5px;
        }

        @media (max-width: 991px) {
          .email-label {
            max-width: 100%;
          }
        }

        .email-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin: 10px 0px;
          height: 48px;
          padding-left: 10px;
        }

        @media (max-width: 991px) {
          .email-input {
            max-width: 100%;
          }
        }

        .email-confirm-label {
          font-family: Inter, sans-serif;
          margin-top: 12px;
        }

        @media (max-width: 991px) {
          .email-confirm-label {
            max-width: 100%;
            margin-top: 10px;
          }
        }

        .email-confirm-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          height: 48px;
          margin: 10px 0 5px;
          padding-left: 10px;
        }

        @media (max-width: 991px) {
          .email-confirm-input {
            max-width: 100%;
          }
        }

        .login-info-part2 {
          font-family: Inter, sans-serif;
          letter-spacing: 0.2px;
          text-transform: uppercase;
          margin-top: 21px;
        }

        @media (max-width: 991px) {
          .login-info-part2 {
            max-width: 100%;
          }
        }

        .password-section {
          background-color: #fff;
          display: flex;
          margin-top: 21px;
          flex-direction: column;
          font-size: 14px;
          color: #2e2e2e;
          font-weight: 300;
          text-transform: uppercase;
          line-height: 178%;
          padding: 5px 32px 32px;
        }

        @media (max-width: 991px) {
          .password-section {
            max-width: 100%;
            padding: 0 20px;
          }
        }

        .password-label {
          font-family: Inter, sans-serif;
          padding-top: 10px;
        }

        @media (max-width: 991px) {
          .password-label {
            max-width: 100%;
          }
        }

        .password-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 10px;
          height: 48px;
          padding-left: 10px;
        }

        @media (max-width: 991px) {
          .password-input {
            max-width: 100%;
            margin-bottom: 20px;
          }
        }

        .personal-info {
          font-family: Inter, sans-serif;
          letter-spacing: 0.2px;
          text-transform: uppercase;
          margin-top: 21px;
        }

        @media (max-width: 991px) {
          .personal-info {
            max-width: 100%;
          }
        }

        .personal-info-section {
          background-color: #fff;
          display: flex;
          margin-top: 22px;
          flex-direction: column;
          font-size: 14px;
          color: #2e2e2e;
          font-weight: 300;
          text-transform: uppercase;
          line-height: 178%;
          padding: 44px 32px;
        }

        @media (max-width: 991px) {
          .personal-info-section {
            max-width: 100%;
            padding: 0 20px;
          }
        }

        .title-label {
          font-family: Inter, sans-serif;
        }

        @media (max-width: 991px) {
          .title-label {
            max-width: 100%;
          }
        }

        .title-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 10px;
          height: 48px;
          padding-left: 10px;
        }

        @media (max-width: 991px) {
          .title-input {
            max-width: 100%;
          }
        }

        .lastname-label {
          font-family: Inter, sans-serif;
          margin-top: 42px;
        }

        @media (max-width: 991px) {
          .lastname-label {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .lastname-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          margin-top: 10px;
          height: 48px;
          padding-left: 10px;
        }

        @media (max-width: 991px) {
          .lastname-input {
            max-width: 100%;
          }
        }

        .firstname-label {
          font-family: Inter, sans-serif;
          margin-top: 47px;
        }

        @media (max-width: 991px) {
          .firstname-label {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .firstname-input {
          border: 1px solid #eae8e4;
          background-color: #fff;
          height: 48px;
          margin: 10px 0 23px;
          padding-left: 10px;
        }

        @media (max-width: 991px) {
          .firstname-input {
            max-width: 100%;
          }
        }

        .next-section {
          justify-content: center;
          align-items: center;
          background-color: #19110b;
          align-self: end;
          margin-top: 33px;
          width: 240px;
          max-width: 100%;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          padding: 17px 60px;
          font: 400 16px Inter, sans-serif;
        }

        @media (max-width: 991px) {
          .next-section {
            margin-bottom: 20px;
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
             {
              /* width: 100%; */
            }
            display: none;
          }
        }

        .customer-service-section {
          background-color: #fff;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          width: 100%;
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
      `}</style>
    </>
  )
}

export default RegistrationPage
