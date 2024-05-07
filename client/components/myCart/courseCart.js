import React from 'react'
import Link from 'next/link'

import {
  IoIosArrowRoundBack,
  IoIosInformationCircleOutline,
  IoIosCloseCircleOutline,
} from 'react-icons/io'

export default function CourseCart({
  cartCourse = [],
  removeCartItem = () => {},
}) {
  return (
    <>
      {/* 串資料庫時做if判斷 */}
      <div className="product-navbar mt-4">
        <div className="d-flex justify-content-between mb-2">
          <div className="text-my-black">
            課程<span>({cartCourse.length})</span>
          </div>
          <Link href="/course" style={{ textDecoration: 'none' }}>
            <div className="d-flex align-items-center back-to-course-list ">
              <IoIosArrowRoundBack className="" size="18px" />
              繼續購物
            </div>
          </Link>
        </div>
        {/* courseItem */}

        <div className="course-container">
          {cartCourse.length > 0 ? (
            cartCourse.map((v) => {
              return (
                <div className="card mb-4" key={v.id}>
                  <div className="card-body">
                    <div className="card-image-container">
                      <img loading="lazy" srcSet={v.image} className="img" />
                    </div>
                    <div className="column-content">
                      <div className="product-name">{v.name}</div>
                      <div className="card-line" />
                      <ul className="product-detail">
                        <li className="d-flex justify-content-between">
                          <div className="label text-h5">講師：</div>
                          <div className="value text-h6 my-auto">
                            {v.teacher}
                          </div>
                        </li>
                        <li className="d-flex justify-content-between">
                          <div className="label text-h5">分鐘：</div>
                          <div className="value text-h6 my-auto">
                            {v.total_minute}分鐘
                          </div>
                        </li>
                        <li className="d-flex justify-content-between">
                          <div className="label text-h5">類型：</div>
                          <div className="value text-h6 my-auto">
                            {v.category}
                          </div>
                        </li>
                      </ul>
                      <div className="product-actions">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="quantity-selector">
                            <div className=""></div>
                            <div className="my-2 mx-4 ">1</div>
                            <div className=""></div>
                          </div>
                          <div className="product-price text-h5 text-my-notice">
                            ＮＴ＄{v.price}
                          </div>
                        </div>
                        <div className="product-button d-flex justify-content-between ">
                          <button className="btn text-h5 text-my-black d-flex align-items-center">
                            <IoIosInformationCircleOutline size="18px" />
                            <Link href={v.url}>
                              <span className="ms-1">瀏覽詳情</span>
                            </Link>
                          </button>
                          <button
                            onClick={() => {
                              removeCartItem(v)
                            }}
                            className="btn text-h5 text-my-black d-flex align-items-center"
                          >
                            <IoIosCloseCircleOutline size="18px" />
                            <span className="ms-1">刪除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className=" d-flex justify-content-center align-items-center no-product  text-h2 text-my-gray">
              沒有商品在購物車
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .product-navbar {
          max-width: 723px;
          padding: 10px;
        }
        .back-to-course-list {
          border-bottom: 1px solid var(--my-black);
        }

        .no-product {
          border-radius: 10px;
          padding: 20px;
          height: 160px;
          overflow: auto;
          background-color: var(--my-white);
        }

        .course-container {
          border-radius: 10px;
          padding: 20px;
          max-height: 760px;
          overflow: auto;
          background-color: var(--my-white);
        }

        .card {
          box-shadow: 1px 1px 6.7px 0px rgba(0, 0, 0, 0.35);
          background-color: var(--white-second, #fff);
          max-width: 723px;
          height: auto;
           {
            /* padding: 10px; */
          }
        }
        .card-body {
          gap: 20px;
          display: flex;
        }

        @media (max-width: 991px) {
          .card-body {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }
        }
        .card-image-container {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          background-color: var(--my-white);
        }

        @media (max-width: 991px) {
          .card-image-container {
            width: 100%;
          }
        }
        .img {
          aspect-ratio: 1;
          object-fit: cover;
          width: 100%;
          height: 100%;
          flex-grow: 1;
        }

        .column-content {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          padding: 5px 0;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .column-content {
            width: 100%;
            margin-top: 20px;
            white-space: initial;
          }
        }

        .product-name {
          color: var(--my-black);
          text-overflow: ellipsis;
          align-self: start;
          font: 900 16px Noto Serif TC, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .card-line {
          background-color: var(--my-gray);
          margin-top: 10px;
          height: 1px;
        }
        .product-detail {
          padding: 0;
          margin: 0;
          border-radius: 10px;
          margin-block: 10px;
          padding: 10px 10px;
          height: 160px;
          background-color: var(--my-white);
        }
        @media (max-width: 991px) {
          .product-detail {
            white-space: initial;
          }
        }

        .label {
          font-feature-settings: 'clig' off, 'liga' off;
          font-family: Noto Serif TC, -apple-system, Roboto, Helvetica,
            sans-serif;
          padding-bottom: 13px;
        }

        .value {
          font-family: Noto Serif TC, -apple-system, Roboto, Helvetica,
            sans-serif;
          align-self: start;
          padding-bottom: 13px;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
        }
         {
          /* @media (max-width: 991px) {
          .product-actions {
            white-space: initial;
          }
        } */
        }

        .quantity-selector {
          justify-content: space-between;
          border-radius: 37.5px;
          border: 0.75px solid var(--notice, #ff0083);
          box-shadow: 3px 3px 3px 0px rgba(255, 255, 255, 0.1) inset,
            -3px -3px 3px 0px rgba(0, 0, 0, 0.1) inset;
          display: flex;
          gap: 20px;
          font-size: 16px;
          color: var(--my-black);
          font-weight: 900;
          white-space: nowrap;
          text-align: center;
          transition: all 0.5s;
           {
            /* &:hover {
            color: var(--my-white);
            background-color: var(--my-notice);
          } */
          }
          & > button {
            font-size: 14px;
          }
          .btn {
            cursor: default !important;
          }
        }
        @media (max-width: 991px) {
          .quantity-selector {
            white-space: initial;
          }
        }

        .product-button {
          margin-top: 25px;
          & button {
            transition: all 0.5s;

            &:hover {
              border-bottom: 1px solid black;
            }
          }
        }
      `}</style>
    </>
  )
}
