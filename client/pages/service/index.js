import React, { useEffect, useState, useContext } from 'react'
import ContactDiv from '@/components/myService/contactDiv'
import Progress from '@/components/myService/progress'
import AreaFilter from '@/components/myService/areaFilter'
import TimeFilter from '@/components/myService/timeFilter'
// import TimeRangePicker from '@/components/myService/TimeRangePicker'
import Search from '@/components/myService/search'
import Map from '@/components/myService/map'
import StoreInfo from '@/components/myService/storeInfo'
import axios from 'axios'
import testmapData from '@/data/store1.json' //地圖測試用資料
import teststoreData from '@/data/store2.json' //店家列表測試用資料
import InventorySearch from '@/components/myService/inventorySearch'
import { StoreContext } from '@/hooks/store-context'

export default function RepairAndServicePage() {
  //首次渲染顯示所有店
  const [loading, setLoading] = useState(false) //監聽到請求時，執行加載動畫
  const [area, setArea] = useState(['n', 'm', 's'])
  const [openTime, setOpenTime] = useState('') //開店時間
  const [closeTime, setCloseTime] = useState('') //閉店時間
  const [textSearch, setTextSearch] = useState('') //關鍵字輸入
  const [geojsonData, setGeojsonData] = useState([]) //用於地圖區的資料
  const [storeData, setStoreData] = useState([]) //用於訊息區的資料
  const [storeDetail, setStoreDetail] = useState(null) // 添加 storeDetail 状态
  const [hoveredStore, setHoveredStore] = useState(null) // 添加 hoveredStore 状态 //這行好像無用
  const [hoveredMarker, setHoveredMarker] = useState(null)

  const { selectedStore } = useContext(StoreContext)
  // console.log(selectedStore)
  // 這段會一直把店名留在頁面運作
  useEffect(() => {
    // setArea([]);
    if (selectedStore) {
      setTextSearch(selectedStore)
    }
  }, [selectedStore])

  //改做法，在area和textsearch組件內拿context???

  //頁面上方用於展開的動畫

  useEffect(() => {
    import('@/utils/serviceTool/serviceIndex.js')
  }, [])

  //依據操作向後端請求資料，(區域變化、時間變化、關鍵字輸入)
  useEffect(() => {
    const combineValue = () => {
      const apiUrl = new URL('http://localhost:3005/api/service')
      let searchParams = new URLSearchParams({
        area: area,
        openTime: openTime,
        closeTime: closeTime,
        textSearch: textSearch,
      })
      apiUrl.search = searchParams

      fetch(apiUrl.href)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json()
        })
        .then((data) => {
          //接回來後要處理成一份json和一份geojson
          setGeojsonData(data)
          setStoreData(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
    combineValue()
    //這個function到時要放在監聽請求，有發送請求就執行這個function
    const handleRequest = () => {
      setLoading(true) // 发出请求时设置加载状态为 true
      setTimeout(() => {
        setLoading(false) // 模拟请求完成后，设置加载状态为 false
      }, 1000)
    }
    handleRequest()
  }, [area, openTime, closeTime, textSearch]) //有value改變時，就發請求
  const handleStoreHover = (store) => {
    setHoveredStore(store)
  }
  const handleMarkerHover = (markerData) => {
    setSelectedMarker(markerData)
  }

  return (
    <>
      <h1 className="text-center mb-3 text-h1">服務據點</h1>
      <section className="row contactDiv hiddenContent">
        <div className="col-12 px-0">
          <ContactDiv />
        </div>
      </section>
      <div className="row">
        <Progress loading={loading} setLoading={setLoading} />
      </div>
      <div className="filter my-3 row align-items-center  justify-content-evenly justify-content-lg-center  mx-0">
        <div className="col-md-3 col-8 text-center  my-2 d-flex justify-content-md-evenly justify-content-center">
          <AreaFilter area={area} setArea={setArea} />
        </div>
        <div className="col-md-3 col-8 text-center p-0 my-2 d-flex justify-content-md-evenly justify-content-center">
          <TimeFilter
            openTime={openTime}
            setOpenTime={setOpenTime}
            closeTime={closeTime}
            setCloseTime={setCloseTime}
          />
          {/* <TimeRangePicker /> 這元件有多餘的時間再搞(來自antd) */}
        </div>
        <div className="col-md-3 col-8 text-center my-2 search-width">
          <Search textSearch={textSearch} setTextSearch={setTextSearch} />
        </div>
      </div>
      <div className="info d-flex row mx-5 mb-5">
        <div className="left col-md-6 px-0 text-center">
          <Map
            geojsonData={geojsonData}
            setGeojsonData={setGeojsonData}
            setStoreDetail={setStoreDetail}
            hoveredStore={hoveredStore}
            setHoveredStore={setHoveredStore}
            hoveredMarker={hoveredMarker}
            setHoveredMarker={setHoveredMarker}
          />
        </div>
        <div className="right col-md-6 px-0">
          <StoreInfo
            storeData={storeData}
            setStoreData={setStoreData}
            storeDetail={storeDetail}
            setStoreDetail={setStoreDetail}
            geojsonData={geojsonData}
            hoveredStore={hoveredStore}
            setHoveredStore={setHoveredStore}
            onStoreHover={handleStoreHover}
            hoveredMarker={hoveredMarker}
            setHoveredMarker={setHoveredMarker}
          />
        </div>
      </div>
      <InventorySearch
        textSearch={textSearch}
        setTextSearch={setTextSearch}
        area={area}
        setArea={setArea}
      />
      {/* 把定位樣式放在page */}
      <style jsx>{`
        .info {
        }
        .contactDiv {
          position: relative;
        }
        @media screen and (max-width: 391px) {
          .contactDiv {
            display: none;
          }
        }
        .hiddenContent {
          height: 0;
          overflow: hidden;
          transition: height 0.8s ease; /* 添加过渡效果 */
        }
        .search-width {
          min-width: 300px;
        }
        .right {
          border-left: 2px solid black;
          max-height: 50vh;
          overflow-y: auto;
        }

        @media screen and (max-width: 391px) {
          .right {
            margin-top: 20px;
            border-left: none;
            border-top: 1px solid black;
          }
        }
      `}</style>
    </>
  )
}
