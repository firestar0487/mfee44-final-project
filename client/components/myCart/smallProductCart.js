import React from 'react'
// //勾子context
import { useCart } from '@/hooks/user-cart'

export default function SmallProductCart({ cartGeneral = [] }) {
  const { formatPrice } = useCart()
  console.log(cartGeneral)
  return (
    <>
      <h4 className="text-p text-my-black mb-2 ">商品({cartGeneral.length})</h4>
      {cartGeneral.map((v, i) => (
        <div
          key={v.id}
          className="smallProductCart-container d-flex flex-row"
          style={{ height: 'auto' }}
        >
          <div className="" style={{ width: '90px', height: '90px' }}>
            <img
              loading="lazy"
              srcSet={v.image}
              className="card-img-top object-fit-cover"
              alt="..."
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-center ">
            <div className=" ms-3 text-h4 text-my-black ">{v.name}</div>
            <div className=" ms-3 text-p text-my-black ">
              {formatPrice(v.price)}
            </div>
            <div className=" ms-3 text-p text-my-black ">數量：{v.qty}</div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .smallProductCart-container {
          padding-block: 10px;
          border-bottom: 0.75px solid var(--my-black);
        }
      `}</style>
    </>
  )
}
