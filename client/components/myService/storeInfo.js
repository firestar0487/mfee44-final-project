import React, { useState,useEffect } from 'react'
import { CiShop } from 'react-icons/ci'
import { FaInfoCircle } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { FaBookmark } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FaPhone } from 'react-icons/fa6'
import { IoTime } from 'react-icons/io5'

export default function StoreInfo({ storeData, setStoreData,storeDetail ,setStoreDetail,geojsonData,hoveredStore,onStoreHover,hoveredMarker,setHoveredMarker  }) {
  const [isHidden, setIsHidden] = useState(false)

  const handleAClick = (detail) => {
    // 修改 handleAClick 函数，接收店铺详细信息作为参数
    setStoreDetail(detail)
    setIsHidden(true)
  }
  useEffect(() => {
    // 当 storeDetail 不为空时，显示店铺详情
    // setIsHidden(!!storeDetail);
    if(storeData.length === 0 && geojsonData.length === 0 ){
      setIsHidden(false)
    }
  }, [storeData,storeDetail,geojsonData]);

  // 监听鼠标悬停事件，将悬停的店铺信息传递给父组件
  const handleStoreHover = (store) => {
    onStoreHover(store);
  };
  const handleMouseEnter = (markerData) => {
    setHoveredMarker(markerData);
  };

  const handleMouseLeave = () => {
    setHoveredMarker(null);
  };

  return (
    <>
      <div>
        {isHidden ? (
          <div className="store-detail">
            <div className="go-back text-center">
              <a
                href="#"
                className="text-my-notice"
                onClick={(e) => {
                  e.preventDefault()
                  setIsHidden(false)
                }}
              >
                <RiArrowGoBackFill />
                返回列表
              </a>
            </div>
            <div className="store-img-div mx-auto">
              <img src={`images/myService/${storeDetail.img}`} alt="" />
            </div>
            <div>
              <ul className='mb-0'>
                <li>
                  <FaBookmark />
                  店名: {storeDetail.name}
                </li>
                <li>
                  <FaLocationDot />
                  地址: {storeDetail.address}
                </li>
                <li>
                  <FaPhone />
                  電話: {storeDetail.phone}
                </li>
                <li>
                  <IoTime />
                  營業時間: {storeDetail.opentime}~{storeDetail.closetime} (Mon-Fri)
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {storeData.length === 0 && geojsonData.length === 0 ? (
              <p className="no-data-message mt-1 text-h3">查無相符條件的據點</p>
            ) : (
              <ul className="list-ul pe-2">
                {storeData.map(
                  (
                    store,
                    index // 假设 storeData 是存储所有店铺信息的数组
                  ) => (
                    <li key={index} onMouseEnter={() => handleMouseEnter(store)} onMouseLeave={handleMouseLeave}>
                      <h5 className="d-flex justify-content-between">
                        <span className="store-icon">
                          <CiShop />
                          {store.name}
                        </span>
                        <span className="info-icon">
                          <FaInfoCircle onClick={() => handleAClick(store)} />{' '}
                          {/* 传递当前店铺详细信息给 handleAClick 函数 */}
                        </span>
                      </h5>
                      <span>{store.address}</span>
                    </li>
                  )
                )}
              </ul>
            )}
          </>
        )}
      </div>
      <style jsx>{`
        @media screen and (max-width: 391px) {
          .list-ul {
            padding: 0;
          }
        }
        .list-ul li {
          list-style-type: none;
          border-bottom: 1px solid black;
        }
        .info-icon:hover {
          cursor: pointer;
        }
        .store-img-div {
          padding: 20px;
          width: 80%; /* 设置容器宽度 */
          height: 40vh; /* 设置容器高度 */
          overflow: hidden; /* 确保图片不会溢出容器 */
          & img {
            width: 100%; /* 图片宽度100%，自适应容器宽度 */
            height: 100%; /* 图片高度自适应，保持宽高比 */
            display: block; /* 防止图片底部产生空白 */
          }
        }
        
        .store-detail ul {
          list-style: none;
          padding-right:36px;
        }
        .store-detail li {
          border-bottom: 1px solid black;
          margin-bottom: 10px;
        }
        .no-data-message {
          text-align: center;
          font-weight: bold;
          color: #ff0083;
        }
      `}</style>
    </>
  )
}
