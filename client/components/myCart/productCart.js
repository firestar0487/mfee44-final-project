import React from 'react'
import Link from 'next/link'

import {
  IoIosArrowRoundBack,
  IoIosInformationCircleOutline,
  IoIosCloseCircleOutline,
} from 'react-icons/io'

export default function ProductCart({
  cartGeneral = [],
  increment = () => {},
  decrement = () => {},
  removeCartItem = () => {},
}) {
  return (
    <>
      <div className="product-navbar mt-4">
        <div className="d-flex justify-content-between mb-2">
          <div className="text-my-black ">
            商品<span>({cartGeneral.length})</span>
          </div>
          <Link href="/product" style={{ textDecoration: 'none' }}>
            <div className="d-flex align-items-center back-to-product-list ">
              <IoIosArrowRoundBack className="" size="18px" />
              繼續購物
            </div>
          </Link>
        </div>
        {/* general-product */}
        <div className="general-container ">
          {cartGeneral.length > 0 ? (
            cartGeneral.map((v, i) => (
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
                        <div className="label text-h5">品牌：</div>
                        <div className="value text-h6 my-auto ">{v.brand}</div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div className="label text-h5">顏色：</div>
                        <div className="value text-h6 my-auto">{v.color}</div>
                      </li>
                      <li className="d-flex justify-content-between">
                        <div className="label text-h5">筆尖：</div>
                        <div className="value text-h6 my-auto">{v.nib}</div>
                      </li>
                    </ul>
                    <div className="product-actions">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="quantity-selector">
                          <button
                            onClick={() => {
                              if (v.qty > 1) {
                                decrement(v.id)
                              } else if (v.qty === 1) {
                                removeCartItem(v)
                              }
                            }}
                            className="btn"
                          >
                            -
                          </button>
                          <div className="my-auto">{v.qty}</div>
                          <button
                            onClick={() => {
                              increment(v.id)
                            }}
                            className="btn"
                          >
                            +
                          </button>
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
            ))
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
        .back-to-product-list {
          border-bottom: 1px solid var(--my-black);
        }
        .no-product {
          border-radius: 10px;
          padding: 20px;
          height: 160px;
          overflow: auto;
          background-color: var(--my-white);
        }

        .general-container {
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
          white-space: wrap;
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

        .product-button {
          margin-top: 25px;
          & button {
            transition: all 0.5s;

            &:hover {
              border-bottom: 1px solid black;
            }
          }
        }
        .show {
          display: none;
        }
      `}</style>
    </>
  )
}
