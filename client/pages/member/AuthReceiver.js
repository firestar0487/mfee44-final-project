import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

const AuthReceiver = () => {
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    // 從URL參數中提取token
    const token = new URLSearchParams(location.search).get('token')
    if (token) {
      // 將token儲存到localStorage
      localStorage.setItem('authToken', token)

      // 這裡假設用戶登入後應該被重定向到會員資料頁面
      history.push('/member/profile')
    } else {
      // 如果沒有token，重定向到登入頁面或首頁
      history.push('/')
    }
  }, [location, history])

  return <div>正在驗證您的登入資訊，請稍候...</div>
}

export default AuthReceiver
