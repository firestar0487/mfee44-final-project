import { useState } from 'react'
import Image from 'next/image'

import styles from '../../pages/index.module.scss'
import { motion } from 'framer-motion'

export default function ConceptSection() {
  //狀態1:設定內容
  const [content, setContent] = useState(
    '在古老的東方，有一種信仰，認為每一滴墨水都蘊含著宇宙的智慧，每一支鋼筆都是通往靈魂深處的鑰匙。在這樣的信仰下，墨韻雅筆誕生了。我們不僅僅是一個販售高品質鋼筆的電子商務網站，我們是一個夢想的實現者，一個將傳統工藝與現代科技完美結合的藝術殿堂。'
  )
  //狀態2:設定active 樣式
  const [activeItem, setActiveItem] = useState('story')

  // content內容
  const contents = {
    story:
      '在古老的東方，有一種信仰，認為每一滴墨水都蘊含著宇宙的智慧，每一支鋼筆都是通往靈魂深處的鑰匙。在這樣的信仰下，墨韻雅筆誕生了。我們不僅僅是一個販售高品質鋼筆的電子商務網站，我們是一個夢想的實現者，一個將傳統工藝與現代科技完美結合的藝術殿堂。',

    write:
      '在每一位書寫者的心中，都有一條屬於自己的書寫之路。墨韻雅筆理解到，這條路上充滿了對美好事物的追求和對深刻情感的表達。因此，我們致力於不僅僅是賣出一支鋼筆，而是要成為每位書寫者旅途中的伙伴。從挑選那一支能夠陪伴你度過漫長書寫時光的鋼筆，到提供專業的使用和保養建議，墨韻雅筆都在努力讓每一次書寫都成為一次心靈的旅行。在這裡，每一支鋼筆都有它的故事，每一滴墨水都承載著情感，我們期待與你共同探索書寫的無限可能。',
    create:
      '在追求卓越的路上，墨韻雅筆深知傳承與創新的重要性。我們精心挑選每一支鋼筆，不僅是因為它們的優雅外觀和卓越性能，更因為它們背後蘊含的匠人精神和創新思想。從古老工藝到現代技術的融合，每一支鋼筆都是工藝與創意完美結合的結晶。墨韻雅筆邀請您一同走進這個匠心世界，感受那些被時間考驗過的傳統工藝與不斷推陳出新的創意之間的對話。在這裡，每一次選購，不僅是獲得一支鋼筆，更是參與到一場文化和創新的旅程中',
  }

  // 滑鼠懸停事件的function 去設定狀態
  const handleMouseEnter = (item) => {
    setContent(contents[item])
    setActiveItem(item)
  }
  return (
    <>
      <div className={`row  ${styles['concept-section']}`}>
        {/* pc */}
        <div className="col-lg-12 bg-my-black d-flex">
          <div className={`row `}>
            {/* 左：圖  */}
            <div className={`col-lg-3 d-flex ${styles['concept-left']}`}>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'fade',
                  delay: 0,
                  duration: 1,
                  ease: 'easeInOut',
                }}
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
              </motion.div>
            </div>
            {/* 中：內容 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                type: 'fade',
                delay: 1,
                duration: 2,
                ease: 'easeInOut',
              }}
              className={`col-lg-6  ${styles['concept-medium']}`}
            >
              <div className={`${styles['flex-container']}`}>
                <div
                  className={`text-h3  ${styles['vertical-text']} ${styles.slogan}`}
                >
                  墨韻流轉・筆尖傳情
                </div>
                <div className={` ${styles.title}`}>Concept</div>
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
              {/* rwd-img */}
              <div
                className={`mx-auto my-3 ${styles['rwd-container']}`}
                style={{
                  maxWidth: '343px',
                  maxHeight: '343px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={'/images/common/rwd-concept1.png'}
                  width={'343'}
                  height={'343'}
                  objectFit="cover"
                  alt="hero image"
                />
              </div>
              <div className={` text-my-white  ${styles['concept-content']}`}>
                {content}
              </div>
            </motion.div>
            {/* 右：圖 */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: 'fade',
                delay: 0,
                duration: 1,
                ease: 'easeInOut',
              }}
              className={`col-lg-3 d-flex ${styles['concept-right']}`}
            >
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
            </motion.div>
          </div>
        </div>
        {/* rwd */}
      </div>
    </>
  )
}
