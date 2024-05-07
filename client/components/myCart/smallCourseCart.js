import React from 'react'
// //勾子context
import { useCart } from '@/hooks/user-cart'
export default function SmallCourseCart({ cartCourse = [] }) {
  const { formatPrice } = useCart()
  return (
    <>
      <h4 className="text-p text-my-black mb-2 mt-4">
        課程({cartCourse.length})
      </h4>
      {cartCourse.map((v, i) => (
        <div
          key={v.id}
          className="smallCourseCart-container d-flex flex-row"
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
          <div className="card-body d-flex flex-column  ">
            <div className=" ms-3 text-h4 text-my-black ">{v.name}</div>
            <div className=" ms-3 text-p text-my-black ">
              {formatPrice(v.price)}
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .smallCourseCart-container {
          padding-block: 10px;
          border-bottom: 0.75px solid var(--my-black);
        }
      `}</style>
    </>
  )
}
