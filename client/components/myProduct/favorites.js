import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation } from 'swiper/modules'

const ProductCard = () => {
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/favorite', {
          credentials: 'include',
        })
        const data = await response.json()
        setFavorites(data.favorites)
        setProducts(data.products)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }

    fetchFavorites()
  }, [])

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : favorites.length === 0 ? (
        <div>
          <div className="d-flex justify-content-center mt-4">沒有收藏商品</div>
          <div className="d-flex justify-content-center mt-4">
          <a href="http://localhost:3000/product/list" className="start-shopping">前往購物</a>

          </div>
        </div>
      ) : (
        <div className='my-3 '>
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          navigation
          modules={[Navigation]}
          direction="horizontal"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div
                className="card border-0  "
                style={{
                  width: '100%',
                  height: 'auto',
                  paddingBlock:'10px',
                  marginInline: ' 10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="card border-0 shadow"
                  style={{
                    width: '180px',
                    height: '280px',
                    display: 'inline-block',
                  }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    as={`/product/${product.id}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div>
                      <img
                        src={`/images/myProduct/${product.image}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%', 
                          objectFit: 'contain', 
                          minHeight: '180px', 
                        }}
                      />
                      <div className="card-body no-space-x">
                        <p
                          className="text-h4 mb-5"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                          }}
                        >
                          {product.name}
                        </p>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '3%',
                            left: '5%',
                          }}
                        >
                          <span className="text-my-notice text-h5">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        
      )}
      <style jsx>{`.start-shopping {
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          background-color: #7c7477;
          margin-top: 26px;
          width: 241px;
          max-width: 100%;
          color: #fff;
          text-align: center;
          padding: 19px 60px;
          font: 14px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .start-shopping {
            white-space: initial;
            padding: 0 20px;
          }
        }`}</style>
    </>
  )
}

export default ProductCard
