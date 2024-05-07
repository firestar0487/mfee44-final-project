import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ProductFigure = ({ pid, image, brand, name, price, order }) => {
  const formattedPrice = price.toLocaleString()
  const [isHovered, setIsHovered] = useState(false)
  console.log(pid)

  useEffect(() => {
    const handleScroll = () => {
      // 處理滾動事件
    }

    window.addEventListener('scroll', handleScroll)

    // 清理函數
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // 依賴陣列

  return (
    <Link
      href={`/product/${pid}`}
      as={`/product/${pid}`}
      style={{ textDecoration: `none` }}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          delay: order * 0.3,
          ease: 'easeInOut',
        }}
        viewport={{ once: true }}
        className="card border-0 shadow"
        style={{
          width: '100%',
          position: 'relative', // 添加相對位置
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image}
          className="card-img-top"
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="card-body no-space-x">
          <p className="text-p">{brand}</p>
          <p
            className="text-h4 mb-5"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
            v
          >
            {name}
          </p>
          <div style={{ position: 'absolute', bottom: '3%', left: '5%' }}>
            <span className="text-my-notice text-h5">${formattedPrice}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductFigure
