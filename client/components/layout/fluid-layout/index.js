import Head from 'next/head'
import Header from '@/components/layout/default-layout/myHeader/header'
import Footer from '@/components/layout/default-layout/myFooter/footer'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import { useState, useEffect, useRef } from 'react'

import ScrollToTopButton from '@/components/myProduct/upbutton'


export default function FluidLayout({ title = '', children }) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null) // 創建一個ref來引用Header組件

  useEffect(() => {
    // 確保Header組件正確輸出了id為'header-nav'的元素
    const header = document.querySelector('#header-nav')
    headerRef.current = header // 將header DOM元素賦值給ref

    // ResizeObserver的回調函數，當觀察的元素尺寸變化時會被調用
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeaderHeight(entry.target.clientHeight) // 更新headerHeight狀態
      }
    })

    if (header) {
      resizeObserver.observe(header) // 監聽header元素的尺寸變化
    }

    return () => {
      if (header) {
        resizeObserver.unobserve(header) // 停止監聽
      }
    }
  }, []) // 空依賴陣列確保effect只在組件掛載時執行
  console.log(headerHeight)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main
        className="flex-shrink-0"
        style={{ marginTop: `${headerHeight}px` }} // 根據header的高度動態調整主體內容的marginTop
      >
        <div className="container-fluid">{children}</div>
        <ScrollToTopButton />
      </main>
      <Footer />
    </>
  )
}
