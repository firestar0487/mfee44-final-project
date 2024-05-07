import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { StoreContext } from '@/hooks/store-context'

export default function InventorySearch({
  inventoryData,
  textSearch,
  setTextSearch,
  area,
  setArea,
}) {
  const [data, setData] = useState(null)

  const { setSelectedStore } = useContext(StoreContext)
  const handleStoreClick = (storeName) => {
    setSelectedStore(storeName)
    // 在這裡您也可以執行其他操作，如導航到其他頁面等
  }

  return (
    <>
      <div className="container">
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          data-bs-scroll="true"
        >
          <div className="offcanvas-header row me-2">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body row">
            <ul>
              {inventoryData &&
                inventoryData.map((item, index) => (
                  <li className="mt-3" key={index}>
                    <Link
                      href={`http://localhost:3000/service`}
                      onClick={() => handleStoreClick(item.store_id)}
                    >
                      {item.store_id}
                    </Link>
                    <span id="span1">
                      <span id="span2">庫存尚餘:</span>{' '}
                      <span id="span3">{item.qty}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        #span3 {
          color: #ff0083;
        }
        .offcanvas {
          transition: transform 0.3s ease, visibility 0.3s ease,
            opacity 0.3s ease;
        }

        @media (max-width: 767.98px) {
          .offcanvas.show {
            width: 100%;
          }
        }

        @media (min-width: 768px) {
          .offcanvas {
            width: 25vw;
          }
        }

        .offcanvas-body {
          padding-block: 0px;
        }

        .offcanvas-body ul {
          list-style: none;
          overflow-y: auto;
          & li {
            font-size: 21px;
            border-bottom: 1px dashed black;
            position: relative;
            & #span1 {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }

        ::-webkit-scrollbar {
          width: 20px; /* 设置滚动条宽度 */
        }
        ::-webkit-scrollbar-thumb {
          background-color: #ff0083;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-button {
          background: transparent;
        }

        @media screen and (max-width: 391px) {
          .img-div {
            width: 70%;
            height: auto;
            overflow: hidden;
            margin-bottom: 5px;

            & img {
              width: 100%;
              height: auto;
            }
          }

          .product-describe {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
