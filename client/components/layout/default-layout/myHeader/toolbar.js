import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './toolbar.module.scss'
import { useCart } from '@/hooks/user-cart'

export default function Toolbar({ handleShow }) {
  const { totalItems } = useCart()
  const [user, setUser] = useState(null) // 使用本地狀態管理用戶訊息

  // 獲取用戶信息
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/user', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  // 登出功能
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        // 登出成功後將用戶狀態設為 null
        setUser(null)
        // 登出成功後重定向到登入頁面
        window.location.href = '/member/login'
      } else {
        // 登出失敗，你可以根據 response.status 提供更具體的錯誤信息
        console.error('登出失敗，狀態碼：', response.status)
        // 在此處添加用戶友好的錯誤處理邏輯
      }
    } catch (error) {
      // 登出過程中發生錯誤，這裡捕獲並處理異常
      console.error('登出過程中發生錯誤：', error)
      // 在此處添加異常處理邏輯
    }
  }

  return (
    <ul className="navbar-nav pe-2 ms-auto">
      <li className="nav-item">
        <Link
          className="nav-link btn btn-outline-light"
          href="/cart"
          role="button"
          title="購物車"
        >
          <div className={styles['button']}>
            <i className="bi bi-cart-fill"></i>
            <span className={styles['button-badge']}>{totalItems}</span>
            <p className="d-none d-md-inline d-lg-none"> 購物車</p>
          </div>
        </Link>
      </li>
      <li className={`nav-item dropdown ${styles['dropdown']}`}>
        <Link
          className="nav-link dropdown-toggle btn btn-outline-light"
          href=""
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="會員中心"
        >
          <i className="bi bi-person-fill"></i>
          <p className="d-none d-md-inline d-lg-none">會員中心</p>
        </Link>
        <ul
          className={`dropdown-menu dropdown-menu-end p-4 mw-100 ${styles['slideIn']} ${styles['dropdown-menu']}`}
        >
          <li>
            <p className="text-center">
              Welcome~
              <br />
              會員: {user ? user.name : '訪客'}
            </p>
          </li>
          <li>
            <Link
              className="dropdown-item text-center"
              href={user ? '/member/profile' : '/member/login'}
            >
              {user ? '會員管理區' : '登入'}
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item text-center" href="/about">
              客服中心
            </Link>
          </li>
          {user && (
            <li>
              <button
                className="dropdown-item text-center"
                onClick={handleLogout}
              >
                登出
              </button>
            </li>
          )}
        </ul>
      </li>
      {/* <li className="nav-item">
        <span
          className="nav-link btn btn-outline-light"
          role="presentation"
          onClick={(e) => {
            e.preventDefault()
            handleShow()
          }}
          title="展示"
        >
          <i className="bi bi-mortarboard-fill"></i>
          <p className="d-none d-md-inline d-lg-none"> 展示</p>
        </span>
      </li> */}
    </ul>
  )
}
