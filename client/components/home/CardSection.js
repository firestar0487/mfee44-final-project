import React, { useState, useEffect } from 'react'
import ProductFigure from './CardDetail'
// import ProductFigure from '../myProduct/productfigure'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { EffectCards, Navigation, Pagination } from 'swiper/modules'

// //勾子context

export default function Detail() {
  const [products, setProducts] = useState([])

  const [displayedProducts, setDisplayedProducts] = useState([])

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pid = '36' //商品id

  // 定义状态来存储屏幕宽度
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [router.isReady])

  // 根据屏幕宽度决定是否使用卡片效果
  const isCardsEffect = screenWidth < 991

  useEffect(() => {
    fetch('http://localhost:3005/api/myProduct')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  useEffect(() => {
    if (pid && products.length > 0) {
      const selectedProduct = products.find(
        (product) => product.product_id === parseInt(pid)
      )

      if (selectedProduct) {
        const currentProductBrand = selectedProduct.brand_name // 根據選擇的產品ID取得品牌名稱
        const sameBrandProducts = products.filter(
          (product) => product.brand_name === currentProductBrand
        ) // 過濾出相同品牌的商品
        const shuffledProducts = shuffleArray(sameBrandProducts) // 洗牌後的商品陣列
        const randomProducts = shuffledProducts.slice(0, 6) // 取得洗牌後的前六個商品
        setDisplayedProducts(randomProducts) // 設定顯示的商品
        setSelectedProduct(selectedProduct) // 設定選擇的產品
      }
    }
  }, [pid, products])

  // 洗牌函式
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    if (pid && products.length > 0) {
      const product = products.find(
        (product) => product.product_id === parseInt(pid)
      )
      setSelectedProduct(product)
    }
  }, [pid, products])

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price)
    return numericPrice.toLocaleString()
  }

  if (loading) {
    return <div id="loading">Loading . . .</div>
  }
  const maxLength = 11
  window.addEventListener('popstate', () => {
    window.location.reload()
  })

  return (
    <>
      {selectedProduct && (
        <>
          {/* <div
            className="row mb-5 overflow-x-auto"
            style={{ whiteSpace: 'nowrap' }}
          >
            <div className="col-12 mb-4">
              <div className="d-inline-flex">
                {displayedProducts.map((product) => (
                  <div
                    className="col"
                    key={product.product_id}
                    style={{ width: '250px', marginRight: '10px' }}
                  >
                    <Link
                      href={`/product/${product.product_id}`}
                      as={`/product/${product.product_id}`}
                      style={{ textDecoration: `none` }}
                    >
                      <ProductFigure
                        key={product.product_id}
                        image={`/images/myProduct/${product.image}`}
                        brand={product.brand_name}
                        name={
                          product.name.length > maxLength
                            ? `${product.name.substring(0, maxLength)}...`
                            : product.name
                        }
                        price={formatPrice(product.price)}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <Swiper
            key={isCardsEffect ? 'cards' : 'slide'} // 基於效果的唯一鍵
            effect={isCardsEffect ? 'cards' : 'slide'}
            modules={
              isCardsEffect
                ? [EffectCards, Navigation, Pagination]
                : [Navigation, Pagination]
            }
            spaceBetween={100}
            slidesPerView={3}
            navigation={isCardsEffect ? false : true}
            loop={false}
            style={{ width: '100%', paddingLeft: 0 }}
            breakpoints={{
              1: {
                slidesPerView: 1,
              },
              // 当视窗宽度小于等于 768px 时，显示 1 个 slide
              768: {
                slidesPerView: 2,
              },
              // 当视窗宽度小于等于 992px 时，显示 2 个 slide
              992: {
                slidesPerView: 3,
              },
              // 默认情况下，在大于 992px 宽度的视窗下，显示 3 个 slide
              1200: {
                slidesPerView: 4,
              },
              1920: {
                slidesPerView: 5,
              },
            }}
          >
            {/* 在 SwiperSlide 中放置产品信息 */}
            {displayedProducts.map((product, i) => (
              <SwiperSlide key={product.product_id}>
                {/* ProductFigure 组件 */}
                <div className="col" style={{ width: '100%', padding: '20px' }}>
                  <Link
                    href={`/product/${product.product_id}`}
                    as={`/product/${product.product_id}`}
                    style={{ textDecoration: `none` }}
                  >
                    <ProductFigure
                      key={i}
                      order={i}
                      image={`/images/myProduct/${product.image}`}
                      brand={product.brand_name}
                      name={
                        product.name.length > maxLength
                          ? `${product.name.substring(0, maxLength)}...`
                          : product.name
                      }
                      price={formatPrice(product.price)}
                      pid={product.product_id}
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx>{`
            ::-webkit-scrollbar {
              height: 3px; /* 滚动条宽度 */
            }

            /* 滚动条轨道 */
            ::-webkit-scrollbar-track {
              background: #f3f3f3; /* 轨道背景颜色 */
            }

            /* 滚动条滑块 */
            ::-webkit-scrollbar-thumb {
              background: #ff69b4; /* 滑块颜色 */
              border-radius: 4px; /* 滑块圆角 */
            }

            /* 滚动条滑块悬停状态 */
            ::-webkit-scrollbar-thumb:hover {
              background: #ff1493; /* 滑块悬停时的颜色 */
            }
          `}</style>
        </>
      )}
    </>
  )
}
