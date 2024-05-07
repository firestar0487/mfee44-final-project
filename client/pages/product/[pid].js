import React, { useState, useEffect } from 'react'
import Carousel from '@/components/myProduct/productcarousel'
import QuantityButton from '@/components/myProduct/quantitybutton'
import ProductFigure from '@/components/myProduct/productfigure'
import { useRouter } from 'next/router'
import { BsGlobe } from 'react-icons/bs'
import { IoIosLock, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import InventorySearch from '@/components/myService/inventorySearch'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation } from 'swiper/modules'
import FavIcon from '@/components/myProduct/fav-icon'

export default function Detail() {
  const [products, setProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inventoryData, setInventoryData] = useState(null)
  const router = useRouter()
  const { pid } = router.query
  const [favorites, setFavorites] = useState([])

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/favorite', {
        credentials: 'include',
      })
      const data = await response.json()
      const productIds = data.favorites.map((item) => item.product_id)

      setFavorites(productIds)
    } catch (error) {
      console.error('Error fetching favorites:', error)
    }
  }
  useEffect(() => {
    fetchFavorites()
  }, [])
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
    return (
      <div className="load" id="loading">
        Loading . . .
      </div>
    )
  }
  window.addEventListener('popstate', () => {
    window.location.reload()
  })
  const fetchInventoryData = () => {
    fetch(`http://localhost:3005/api/inventory/${pid}`)
      .then((response) => response.json())
      .then((data) => {
        setInventoryData(data)
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error)
      })
  }
  console.log(favorites)
  return (
    <>
      {selectedProduct && (
        <>
          <InventorySearch inventoryData={inventoryData} />
          <div className="row mt-5">
            <div className="col-lg-7 my-3">
              <div className="position-sticky" style={{ top: '2rem' }}>
                <Carousel products={products} pid={pid} />
              </div>
            </div>
            <div className="col-lg-5 my-3">
              <div className="position-sticky" style={{ top: '2rem' }}>
                <h1 className="text-h2 py-3">{selectedProduct.name}</h1>
                <h3 className="text-h3 text-my-notice">
                  NT ${Number(selectedProduct.price).toLocaleString()}
                </h3>
                <div className="mt-4">
                  <BsGlobe className="mx-3" />
                  Express Shipping <br />
                  <IoIosLock className="mx-3" />
                  Secure payments <br />
                  <IoMdCheckmarkCircleOutline className="mx-3" />
                  Authentic products <br />
                </div>
                <div className="mt-4 mx-2 my-text-contents-CH">
                  <div>
                    系列
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.series}
                    </span>
                  </div>

                  <div>
                    材質
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.material_name}
                    </span>
                  </div>

                  <div>
                    顏色
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.color_name}
                    </span>
                  </div>

                  <div>
                    筆尖
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.nib_name}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-5 px-1">
                    <span className="text-h4 text-my-notice">
                      <FavIcon
                        id={Number(pid)}
                        favorites={favorites}
                        setFavorites={setFavorites}
                      />{' '}
                      加到收藏
                    </span>
                    <a
                      className="styled-link text-h4"
                      id="a1"
                      data-bs-toggle="offcanvas"
                      href="#offcanvasExample"
                      role="button"
                      aria-controls="offcanvasExample"
                      onClick={fetchInventoryData}
                    >
                      庫存查詢
                    </a>
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <QuantityButton products={products} pid={pid} />

                  <div
                    className="accordion accordion-flush m-2"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          aria-expanded="false"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-controls="panelsStayOpen-collapseOne"
                          style={{ borderBottom: '1px solid #929292' }}
                        >
                          支付方式
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body p-3">
                          官網提供信用卡金流（支援VISA/MASTER/JCB等發卡組織）、超商貨到付款(711/全家/OK)，金流系統為「綠界科技Ecpay」支援。
                          <br />
                          <br />
                          免息3期付款
                          官網提供信用卡免息分期付款，免息期數為3期，可以參閱指定銀行名單。
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="accordion accordion-flush m-2"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          aria-expanded="false"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-controls="panelsStayOpen-collapseTwo"
                          style={{ borderBottom: '1px solid #929292' }}
                        >
                          配送方式與運費
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body p-3">
                          黑貓配送 (滿NT1000免費送貨，未滿須付NT200） •
                          出貨後1-2天內可送達
                          <br />
                          <br />
                          超商取貨付款/不付款(滿NT1000免費送貨，未滿須付NT200）
                          • 出貨後2至3天後抵達指定超商門市 •
                          超商取貨訂單於送達指定門市後將有7天取貨期限
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-sm-12">
              <div className="product-info my-5">
                <div className="text-h2">產品介紹</div>
                <p className="my-text-contents-CH ms-3 my-5">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
          </div>
          <div className="text-h2 my-5">其他人還看了</div>
          <div className="mb-4">
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              navigation
              loop={false}
              style={{ width: '100%', paddingLeft: 15 }}
              modules={[Navigation]}
              breakpoints={{
                1: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 4,
                },
              }}
            >
              {displayedProducts.map((product) => (
                <SwiperSlide key={product.product_id}>
                  {/* ProductFigure 组件 */}
                  <div
                    className="col"
                    style={{ width: '300px', margin: '10px' }}
                  >
                    <ProductFigure
                      key={product.product_id}
                      pid={pid}
                      image={`/images/myProduct/${product.image}`}
                      brand={product.brand_name}
                      name={product.name}
                      price={formatPrice(product.price)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
      <style jsx>{`
        .styled-link {
          color: #7c7477;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .styled-link:hover {
          color: #ff0083;
        }

        .styled-link:focus {
          outline: none;
        }
      `}</style>
    </>
  )
}
