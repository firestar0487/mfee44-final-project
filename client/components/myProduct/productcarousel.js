import { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

const getProductImages = (imageName) => {
  // 提取基礎名稱
  const baseName = imageName.split('-')[0]
  const images = []
  for (let i = 1; i <= 9; i++) {
    // 構建圖片路徑
    const imagePath = `/images/myProduct/${baseName}-${i}.jpg`
    // 檢查圖片是否存在，如果存在則添加到圖片數組中
    if (imageExists(imagePath)) {
      images.push(imagePath)
    } else {
      // 如果圖片不存在，則跳出循環
      break
    }
  }
  return images
}

// 檢查圖片是否存在的輔助函數
const imageExists = (url) => {
  var http = new XMLHttpRequest()
  http.open('HEAD', url, false)
  http.send()
  return http.status != 404
}

export default function Carousel({ products, pid }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const product = products.find((product) => product.product_id == pid)
  // 使用 useMemo 缓存特定产品的图片数组
  const currentProductImages = useMemo(() => {
    // 找到与 pid 对应的产品
    // 如果找到了相应的产品，则生成与该产品相关的图片数组
    if (product) {
      return getProductImages(product.image)
    }
  }, [product])

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Swiper
          style={{
            '--swiper-navigation-color': 'gray',
            '--swiper-pagination-color': '#fff',
            maxHeight: '600px',
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {currentProductImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={3}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          style={{
            maxHeight: '150px',
            marginTop: '3px'
          }}
        >
          {currentProductImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
