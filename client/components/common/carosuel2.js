import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectFade,
} from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

//ref

export default function Carosuel2() {
  const [swiperStyle, setSwiperStyle] = useState({
    maxWidth: '1920px',
    maxHeight: '665px',
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setSwiperStyle({ minWidth: '390px', minHeight: '235px' })
      } else {
        setSwiperStyle({
          maxWidth: '1920px',
          maxHeight: '665px',
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // 初始化

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <Swiper
        style={swiperStyle}
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        effect="fade" // 启用淡入淡出效果
        fadeEffect={{
          crossFade: true, // 开启交叉淡入淡出
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className="mySwiper custom-swiper"
        id="mySwiper"
      >
        <SwiperSlide>
          {/* 網站banner */}
          <Link href={'/product/list'}>
            {/* pc */}
            <img
              src="/images/common/banner1.png"
              className="object-fit-cover pc-image"
            />
            {/* rwd */}
            <img
              src="/images/common/banner-1600-1.png"
              className="object-fit-cover rwd-image "
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          {/* pc */}
          <img
            src="/images/common/banner2.png"
            className="object-fit-cover pc-image"
          />
          {/* rwd */}
          <img
            src="/images/common/banner-1600-2.png"
            className="object-fit-cover rwd-image "
          />
        </SwiperSlide>
        <SwiperSlide>
          {/* pc */}
          <img
            src="/images/common/banner3.png"
            className="object-fit-cover pc-image"
          />
          {/* rwd */}
          <img
            src="/images/common/banner-1600-3.png"
            className="object-fit-cover rwd-image "
          />
        </SwiperSlide>

        {/* Custom Navigation Buttons */}
        <div className={`custom-swiper-button-prev `}>
          <IoIosArrowBack size={30} />
        </div>
        <div className={`custom-swiper-button-next `}>
          <IoIosArrowForward size={30} />
        </div>
      </Swiper>
      <style jsx global>{`
        :root {
          --swiper-theme-color: var(--my-notice); /* 修改为您希望的颜色 */
        }
      `}</style>
      <style jsx>{`
        .pc-image {
          display: block;
        }
        .rwd-image {
          display: none;
        }
        @media (max-width: 991px) {
          .pc-image {
            display: none;
          }
          .rwd-image {
            display: block;
          }
        }

        .custom-swiper-button-prev,
        .custom-swiper-button-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          cursor: pointer;
          color: var(--my-black);
          transition: all 0.5s;
          scale: 1;
          &:hover {
            color: var(--my-notice);
          }
        }
        .custom-swiper-button-prev {
          left: 10px;
        }
        .custom-swiper-button-next {
          right: 10px;
        }
        .hidden {
          display: none;
        }
        .object-fit-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
