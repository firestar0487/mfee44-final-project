import React, { useState, useEffect } from 'react'
import FavIcon from '@/components/myProduct/fav-icon'
import Link from 'next/link'

const ProductFigure = ({ pid, image, brand, name, price }) => {
  const formattedPrice = price.toLocaleString()
  const [isHovered, setIsHovered] = useState(false)
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

  return (
    <div
      className="card border-0 shadow"
      style={{
        width: '100%',
        height: '500px',
        position: 'relative',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'absolute', top: '5%', left: '5%', zIndex: 1 }}>
        <FavIcon id={pid} favorites={favorites} setFavorites={setFavorites} />
      </div>
      <Link
        href={`/product/${pid}`}
        as={`/product/${pid}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          src={image}
          className="card-img-top"
          alt={name}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
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
      </Link>
    </div>
  )
}

export default ProductFigure
