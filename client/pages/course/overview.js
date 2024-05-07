import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CardGroup from '@/components/course/card-group.js'
import FilterBar from '@/components/course/filter-bar'
import Pagination from 'react-bootstrap/Pagination'

export default function CoursePage() {
  const router = useRouter()

  const [filterProps, setFilterProps] = useState({
    filterType: '',
    filterState: '',
    filterSearch: '',
    filterSort: 'DESC',
  })

  const [data, setData] = useState([])

  const [nowPage, setNowPage] = useState(1)

  const [totalPage, setTotalPage] = useState(1)

  let fetchUrl = 'http://localhost:3005/api/course/overview?'
  if (filterProps.filterType === '文字') {
    fetchUrl += '&type=1'
  } else if (filterProps.filterType === '繪畫') {
    fetchUrl += '&type=2'
  }
  if (filterProps.filterState === '最熱門') {
    fetchUrl += '&state=1'
  } else if (filterProps.filterState === '依價格') {
    fetchUrl += '&state=2'
  } else if (filterProps.filterState === '依時間') {
    fetchUrl += '&state=3'
  }
  if (filterProps.filterSearch) {
    fetchUrl += '&search=' + filterProps.filterSearch
  }
  if (nowPage) {
    fetchUrl += '&page=' + nowPage
  }
  if (filterProps.filterSort) {
    fetchUrl += '&sort=' + filterProps.filterSort
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl)
        const data = await response.json()
        setData(data.results)
        setTotalPage(data.total_page)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [fetchUrl, totalPage])
  useEffect(() => {
    if (router.query.type == 1) {
      setFilterProps({ ...filterProps, filterType: '文字' })
    }
    if (router.query.type == 2) {
      setFilterProps({ ...filterProps, filterType: '繪畫' })
    }
    if (router.query.state == 1) {
      setFilterProps({ ...filterProps, filterState: '最熱門' })
    }
    if (router.query.state == 2) {
      setFilterProps({ ...filterProps, filterState: '依價格' })
    }
    if (router.query.state == 3) {
      setFilterProps({ ...filterProps, filterState: '依時間' })
    }
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl)
        const data = await response.json()
        setData(data.results)
        setTotalPage(data.totalPage)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <FilterBar
        filterProps={filterProps}
        setFilterProps={setFilterProps}
        setNowPage={setNowPage}
        router={router}
      />
      {data.length > 0 ? <CardGroup data={data} /> : ''}
      {/* <div className="text-h2">{`關鍵字: ${filterProps.filterSearch} 找不到相關課程或老師`}</div> */}

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              if (nowPage - 1 >= 1) {
                setNowPage(nowPage - 1)
              } else {
                setNowPage(1)
              }
            }}
          />
          {Array.from({ length: totalPage }, (_, index) => index + 1).map(
            (number) => (
              <Pagination.Item
                key={number}
                active={number === nowPage}
                onClick={() => {
                  setNowPage(number)
                }}
              >
                {number}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => {
              if (nowPage + 1 <= totalPage) {
                setNowPage(nowPage + 1)
              } else {
                setNowPage(totalPage)
              }
            }}
          />
        </Pagination>
      </div>
    </>
  )
}
