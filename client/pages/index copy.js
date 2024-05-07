import { useState } from 'react'
import FluidLayout from '@/components/layout/fluid-layout'
import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.scss'

export default function Home() {
  // 定义两个状态，一个用于内容，一个用于追踪激活的项
  const [content, setContent] = useState(
    '在古老的東方，有一種信仰，認為每一滴墨水都蘊含著宇宙的智慧，每一支鋼筆都是通往靈魂深處的鑰匙。在這樣的信仰下，墨韻雅筆誕生了。我們不僅僅是一個販售高品質鋼筆的電子商務網站，我們是一個夢想的實現者，一個將傳統工藝與現代科技完美結合的藝術殿堂。'
  )
  const [activeItem, setActiveItem] = useState('story')

  // 定义内容数据
  const contents = {
    story:
      '在古老的東方，有一種信仰，認為每一滴墨水都蘊含著宇宙的智慧，每一支鋼筆都是通往靈魂深處的鑰匙。在這樣的信仰下，墨韻雅筆誕生了。我們不僅僅是一個販售高品質鋼筆的電子商務網站，我們是一個夢想的實現者，一個將傳統工藝與現代科技完美結合的藝術殿堂。',

    write:
      '在每一位書寫者的心中，都有一條屬於自己的書寫之路。墨韻雅筆理解到，這條路上充滿了對美好事物的追求和對深刻情感的表達。因此，我們致力於不僅僅是賣出一支鋼筆，而是要成為每位書寫者旅途中的伙伴。從挑選那一支能夠陪伴你度過漫長書寫時光的鋼筆，到提供專業的使用和保養建議，墨韻雅筆都在努力讓每一次書寫都成為一次心靈的旅行。在這裡，每一支鋼筆都有它的故事，每一滴墨水都承載著情感，我們期待與你共同探索書寫的無限可能。',
    create:
      '在追求卓越的路上，墨韻雅筆深知傳承與創新的重要性。我們精心挑選每一支鋼筆，不僅是因為它們的優雅外觀和卓越性能，更因為它們背後蘊含的匠人精神和創新思想。從古老工藝到現代技術的融合，每一支鋼筆都是工藝與創意完美結合的結晶。墨韻雅筆邀請您一同走進這個匠心世界，感受那些被時間考驗過的傳統工藝與不斷推陳出新的創意之間的對話。在這裡，每一次選購，不僅是獲得一支鋼筆，更是參與到一場文化和創新的旅程中',
  }

  // 处理鼠标悬停事件
  const handleMouseEnter = (item) => {
    setContent(contents[item])
    setActiveItem(item)
  }
  return (
    <>
      <div className="row">
        {/* carosuel */}
        <div className={`bg-danger col-lg-12`}>
          <h1>輪播圖</h1>
        </div>
      </div>
      {/* hero-section */}
      <div className={`row ${styles['hero-section']}`}>
        <div className="bg-primary col-lg-12">
          <div className="row">
            {/* hero-img */}
            <div className={`col-lg-6 bg-black ${styles['image-container']}`}>
              <Image
                src="/images/common/hero.png"
                layout="fill"
                objectFit="cover"
                alt="hero image"
              />
              <Link href={'/product/list'}>
                <div className={`my-button3 ${styles['hero-button']}`}>
                  探索商品
                </div>
              </Link>
            </div>
            {/* hero-content */}

            <div className={`col-lg-6 bg-my-white d-flex`}>
              <div
                className={`m-auto ${styles['hero-text-body']} ${styles['hero-content']}`}
              >
                <div className={`${styles['text-top']}`}>
                  <h3 className="title text-h3 text-my-black">
                    書寫，非筆墨所致，而心靈所至 —— 墨韻雅筆
                  </h3>
                  <p className={` text-h4 text-my-gray ${styles['slogan']}`}>
                    透過每一滴墨水，連結每一次思考的深度
                  </p>
                  <p className={`text-p text-my-gray ${styles['intro']}`}>
                    從經典傳統到現代創新，每一支鋼筆都是對卓越工藝的致敬，墨韻雅筆，為愛筆者傾心打造，為書寫者傳情達意。點擊探索，開啟您與墨韻雅筆的非凡旅程。
                  </p>
                </div>
                <div className={` ${styles['text-down']}`}>
                  <p className={` text-h4 text-my-primary ${styles['title']}`}>
                    書寫藝術，筆尖流傳
                  </p>
                  <Link href="/product/list">
                    <div className="my-button2">探索商品</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* concept */}
      <div className={`row ${styles['concept-section']}`}>
        <div className="col-lg-12 bg-my-black d-flex">
          <div className="row">
            {/* 左：圖  */}
            <div className="col-lg-3 d-flex">
              <div
                className="m-auto"
                style={{
                  maxWidth: '336px',
                  maxHeight: '336px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={'/images/common/concept1.png'}
                  width={'336'}
                  height={'336'}
                  objectFit="cover"
                  alt="hero image"
                />
              </div>
            </div>
            {/* 中：內容 */}
            <div className={`col-lg-6  ${styles['concept-medium']}`}>
              <div className={`${styles['flex-container']}`}>
                <div className={` ${styles.title}`}>Concept</div>
                <div
                  className={`text-h3 ${styles['vertical-text']} ${styles.slogan}`}
                >
                  墨韻流轉・筆尖傳情
                </div>
              </div>

              <div className={` my-3 ${styles['conecpt-nav']}`}>
                <ul className="list-unstyled d-flex justify-content-between">
                  <li
                    onMouseEnter={() => handleMouseEnter('story')}
                    className={`text-h5 text-my-gray ${
                      styles['vertical-text']
                    } ${activeItem === 'story' ? styles['active'] : ''}`}
                  >
                    品牌故事
                  </li>
                  <li
                    onMouseEnter={() => handleMouseEnter('write')}
                    className={`text-h5 text-my-gray ${
                      styles['vertical-text']
                    } ${activeItem === 'write' ? styles['active'] : ''}`}
                  >
                    書寫之旅
                  </li>
                  <li
                    onMouseEnter={() => handleMouseEnter('create')}
                    className={`text-h5 text-my-gray ${
                      styles['vertical-text']
                    } ${activeItem === 'create' ? styles['active'] : ''}`}
                  >
                    傳承創新
                  </li>
                </ul>
              </div>
              <div className={` text-my-white ${styles['concept-content']}`}>
                {content}
              </div>
            </div>
            {/* 右：圖 */}
            <div className="col-lg-3 d-flex">
              <div
                className="m-auto"
                style={{
                  maxWidth: '223px',
                  maxHeight: '336px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={'/images/common/concept2.png'}
                  width={'223'}
                  height={'336'}
                  objectFit="cover"
                  alt="hero image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="bg-warning col-lg-12">
          <h1>區塊4</h1>
        </div>
      </div>
    </>
  )
}

Home.getLayout = function (page) {
  return <FluidLayout>{page}</FluidLayout>
}
