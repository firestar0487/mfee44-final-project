import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  // 使用 undefined 初始化狀態，這樣在 SSR 時不會出錯
  const [windowWidth, setWindowWidth] = useState(undefined)

  useEffect(() => {
    // 組件掛載後設置狀態為 window 的寬度
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // 清理函數移除事件監聽器
    return () => window.removeEventListener('resize', handleResize)
  }, []) // 空依賴陣列表示此效果在掛載時運行一次

  // 根據窗口寬度確定吐司位置
  const position = windowWidth < 991 ? 'top-center' : 'bottom-right'

  return (
    <Toaster
      position={position}
      gutter={20}
      reverseOrder={false}
      containerStyle={{}}
      toastOptions={{
        loading: {
          icon: '👏',
          style: {
            border: '1px solid #713200',
            marginRight: '5%',
            padding: '16px',
            color: 'var(--my-black)',
          },
        },
        error: {
          style: {
            border: '1px solid #713200',
            marginRight: '5%',
            padding: '16px',
            color: 'var(--my-notice)',
          },
        },
        success: {
          style: {
            border: '1px solid #713200',
            marginRight: '5%',
            padding: '16px',
            color: 'var(--my-black)',
          },
        },
      }}
    />
  )
}

export default ToasterProvider
