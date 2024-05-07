import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoginLogic from '@/components/member/useLogin'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginContent() {
  const router = useRouter()
  const { email, setEmail, password, setPassword, handleLogin } = LoginLogic({
    onLoginSuccess: () => {
      
      toast.success('登入成功！正在跳轉到個人資料頁面...')   
      
      setTimeout(() => {
        router.push('./profile')
      }, 2000)
    },
    onLoginFail: (error) => {
      console.error('登入失敗：', error)
      toast.error('登入失敗，请重试。') 
    },
  })

  const handleGoogleLogin = () => {
   
    const clientId =
      '970712749451-atles9m33gi0df30v5jtkqa24pirma4i.apps.googleusercontent.com'
    const redirectUri = 'http://localhost:3005/api/myGoogle-Login' 
    const scope = 'email profile'
    const responseType = 'code'

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${scope}`
    window.location.href = googleUrl
  }

  return (
    <>
    <ToastContainer />
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <div className="login-heading">登入</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5ecda91335800e4b801a23cb79d27db6b9e48d6bc7e5e40c6cac70c71f50c8a?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&"
              className="close-icon"
              alt="Close Icon"
            />
          </div>
          <div className="registered-user">已有會員?</div>
          <form onSubmit={handleLogin}>
            <div className="login-label">登入*</div>
            <input
              type="text"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-label">密碼*</div>
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot-password">忘記密碼？</div>
            <button type="submit" className="login-button">
              登入
            </button>
            <button
              type="button"
              className="google-login"
              onClick={handleGoogleLogin}
            >
              <span>使用GOOGLE帳號登入</span>
            </button>
            <button
              className="line-login"
              onClick={() => {
                const clientId = '2003654359'
                const redirectUri = encodeURIComponent(
                  'http://localhost:3005/api/myLine-Login'
                )
                const state = '隨機或固定字串，用於防止CSRF攻擊'
                const scope = encodeURIComponent('profile openid')
                const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`

                window.location.href = authUrl
              }}
            >
              <span>使用LINE帳號登入</span>
            </button>
          </form>
        </div>
        <div className="create-account"></div>
        <div className="create-account-label">建立帳號</div>
        <Link href="/member/register">
          <button className="create-personal-account">建立個人帳號</button>
        </Link>
      </div>
      <style jsx>{`
        .login-container {
          justify-content: center;
          align-items: center;
          background-color: #fff;
          display: flex;
          max-width: 720px;
          flex-direction: column;
          color: #000;
          font-weight: 400;
          padding: 50px 0;
        }

        .login-content {
          display: flex;
          margin-top: 16px;
          width: 480px;
          max-width: 100%;
          flex-direction: column;
          font-size: 13px;
          padding: 0 20px;
        }

        .login-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-size: 16px;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .login-header {
            max-width: 100%;
            flex-wrap: wrap;
            white-space: initial;
          }
        }

        .login-heading {
          font-family: Inter, sans-serif;
        }

        .close-icon {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 16px;
          align-self: start;
        }

        .registered-user {
          margin-top: 52px;
          font: 15px Inter, sans-serif;
          align-self: start;
        }

        @media (max-width: 991px) {
          .registered-user {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .login-label {
          font-family: Inter, sans-serif;
          margin-top: 28px;
          align-self: start;
        }

        @media (max-width: 991px) {
          .login-label {
            max-width: 100%;
          }
        }

        .login-input {
          border-radius: 4px;
          border: 1px solid #eae8e4;
          margin-top: 11px;
          height: 48px;
          width: 100%;
          padding: 0px 10px;
        }

        @media (max-width: 991px) {
          .login-input {
            max-width: 100%;
          }
        }

        .password-label {
          font-family: Inter, sans-serif;
          margin-top: 26px;
          align-self: start;
        }

        @media (max-width: 991px) {
          .password-label {
            max-width: 100%;
          }
        }

        .password-input {
          border-radius: 4px;
          border: 1px solid #eae8e4;
          margin-top: 7px;
          height: 48px;
          padding: 0px 10px;
          width: 100%;
        }

        @media (max-width: 991px) {
          .password-input {
            max-width: 100%;
          }
        }

        .forgot-password {
          font-family: Inter, sans-serif;
          justify-content: center;
          border: none;
          background-color: rgba(255, 255, 255, 0);
          align-self: start;
          margin-top: 8px;
          aspect-ratio: 3.94;
          color: #19110b;
          white-space: nowrap;
          padding: 2px 0;
          transition: color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
        }

        .forgot-password:hover {
          color: gray;
        }

        @media (max-width: 991px) {
          .forgot-password {
            white-space: initial;
          }
        }

        .login-button {
          justify-content: center;
          align-items: center;
          border-radius: 1440px;
          border: 1px solid #19110b;
          background-color: #19110b;
          margin-top: 25px;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          padding: 18px 60px;
          font: 14px Inter, sans-serif;
          transition: color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
          width: 100%;
        }
        .login-button:hover {
          background-color: white;
          color: black;
        }

        .google-login {
          justify-content: center;
          align-items: center;
          border-radius: 1440px;
          border: 1px solid #19110b;
          backdrop-filter: blur(7.5px);
          background-color: rgba(255, 255, 255, 0.2);
          margin-top: 8px;
          color: #19110b; /* Initial text color */
          white-space: nowrap;
          text-align: center;
          padding: 18px 60px;
          font: 14px Inter, sans-serif;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .google-login::before {
          content: '';
          position: absolute;
          top: 0;
          right: 100%; /* Start from the right outside of the button */
          width: 100%; /* Equal width to the button */
          height: 100%;
          background-color: #4285f4;
          transition: right 0.5s ease; /* Smooth transition for sliding effect */
          z-index: 1;
        }

        .google-login:hover::before {
          right: 0;
        }
        .google-login span {
          position: relative;
          z-index: 2; /* Ensures text is above the green background */
          display: block;
        }

        .google-login:hover span {
          color: #ffffff; /* Change text color to white on hover */
        }

        .line-login {
          justify-content: center;
          align-items: center;
          border-radius: 1440px;
          border: 1px solid #19110b;
          backdrop-filter: blur(7.5px);
          background-color: rgba(255, 255, 255, 0.2);
          margin-top: 8px;
          color: #19110b; /* Initial text color */
          white-space: nowrap;
          text-align: center;
          padding: 18px 60px;
          font: 14px Inter, sans-serif;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .line-login:before {
          content: '';
          position: absolute;
          top: 0;
          right: 100%; /* Start from the right outside of the button */
          width: 100%; /* Equal width to the button */
          height: 100%;
          background-color: #00b900; /* Green background */
          transition: right 0.5s ease; /* Smooth transition for sliding effect */
          z-index: 1;
        }

        .line-login:hover:before {
          right: 0; /* Slide in to fill the button on hover */
        }

        .line-login span {
          position: relative;
          z-index: 2; /* Ensures text is above the green background */
          display: block;
        }

        .line-login:hover span {
          color: #ffffff; /* Change text color to white on hover */
        }

        .create-account {
          border-top: 1px solid #eae8e4;
          align-self: stretch;
          min-height: 1px;
          margin-top: 40px;
          width: 100%;
        }

        @media (max-width: 991px) {
          .create-account {
            max-width: 100%;
          }
        }

        .create-account-label {
          margin-top: 15px;
          font: 16px Inter, sans-serif;
        }

        .create-personal-account {
          justify-content: center;
          align-items: center;
          border-radius: 1440px;
          border: 1px solid #19110b;
          backdrop-filter: blur(7.5px);
          background-color: rgba(255, 255, 255, 0.2);
          margin-top: 16px;
          width: 350px;
          max-width: 100%;
          color: #19110b;
          white-space: nowrap;
          text-align: center;
          padding: 18px 60px;
          font: 14px Inter, sans-serif;
          transition: color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
        }

        .create-personal-account:hover {
          background-color: black;
          color: white;
        }

        @media (max-width: 991px) {
          .div-15 {
            white-space: initial;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  )
}
export default LoginContent
