import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

import { FaArrowUp } from "react-icons/fa";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 监听页面滚动事件，控制按钮的显示与隐藏
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 处理按钮点击事件，将页面滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动到顶部
    })
  }

  return (
    <>
      <button
        className={`scroll-to-top-button d-flex align-items-center justify-content-center  ${isVisible ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
      >
      <FaArrowUp />
      </button>
      <style jsx>{`
        .scroll-to-top-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #ff1493;
          color: white;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: opacity 0.3s ease-in-out;
        }

        .scroll-to-top-button.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .scroll-to-top-button.visible {
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export default ScrollToTopButton
