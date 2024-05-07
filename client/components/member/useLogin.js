import React, { useState } from 'react'

const LoginLogic = ({ onLoginSuccess, onLoginFail }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('電子郵件和密碼不能為空')
      return
    }

    try {
      const response = await fetch('http://localhost:3005/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()
      if (response.ok) {
        onLoginSuccess(data)
      } else {
        setError(data.error || '登入失敗')
        onLoginFail(data.error || '登入失敗')
      }
    } catch (error) {
      console.error('登入錯誤：', error)
      setError('登入時發生錯誤')
      onLoginFail('登入時發生錯誤')
    }
  }

  return { email, setEmail, password, setPassword, error, handleLogin }
}

export default LoginLogic
