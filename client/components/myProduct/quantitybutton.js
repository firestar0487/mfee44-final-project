import React from 'react'
import { useCart } from '@/hooks/user-cart'

export default function QuantityButton({ products, pid }) {
  const { addCartItem } = useCart()

  const addToCart = () => {
    const selectedProduct = products.find(
      (product) => product.product_id == pid
    )
    if (selectedProduct) {
      const currentPageUrl = window.location.href
      addCartItem({
        type: 'general',
        id: selectedProduct.product_id,
        name: selectedProduct.name,
        image: `/images/myProduct/${selectedProduct.image}`,
        price: selectedProduct.price,
        desc: selectedProduct.description,
        brand: selectedProduct.brand_name,
        color: selectedProduct.color_name,
        nib: selectedProduct.nib_name,
        material: selectedProduct.material_name,
        url: currentPageUrl,
        // qty: qty,
      })
    }
  }

  return (
    <>
      <button
        className="btn btn-primary w-100 my-3 rounded-pill"
        onClick={addToCart}
      >
        加入購物車
      </button>
      <style jsx>{`
        .quantity-selector {
          justify-content: space-between;
          border-radius: 37.5px;
          border: 0.75px solid var(--notice, #ff0083);
          box-shadow: 3px 3px 3px 0px rgba(255, 255, 255, 0.1) inset,
            -3px -3px 3px 0px rgba(0, 0, 0, 0.1) inset;
          display: flex;
          gap: 45px;
          font-size: 16px;
          color: var(--my-black);
          font-weight: 900;
          white-space: nowrap;
          text-align: center;
          transition: all 0.5s;
          &:hover {
            color: var(--my-white);
            background-color: var(--my-notice);
          }
          & > button {
            font-size: 14px;
          }
        }
        @media (max-width: 991px) {
          .quantity-selector {
            white-space: initial;
          }
        }
      `}</style>
    </>
  )
}
