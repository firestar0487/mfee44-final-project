import { BsSortDownAlt, BsSortDown } from 'react-icons/bs'
import Link from 'next/link'
import React, { useState } from 'react'

export default function FilterBar({
  filterProps,
  setFilterProps,
  router,
  setNowPage,
}) {
  const [searchText, setSearchText] = useState('')
  let filterType = filterProps.filterType ? filterProps.filterType : ''
  let filterState = filterProps.filterState ? filterProps.filterState : ''
  let filterSearch = filterProps.filterSearch ? filterProps.filterSearch : ''
  let filterSort = filterProps.filterSort ? filterProps.filterSort : ''
  // console.log('filterType:', filterType)
  // console.log('filterState:', filterState)
  // console.log('filterSearch:', filterSearch)
  // console.log('filterProps:', filterProps)

  const handleFilter = (e) => {
    let filterType = filterProps.filterType ? filterProps.filterType : ''
    let filterState = filterProps.filterState ? filterProps.filterState : ''
    let filterSearch = filterProps.filterSearch ? filterProps.filterSearch : ''
    let filterSort = filterProps.filterSort ? filterProps.filterSort : 'DESC'
    let filterText = e.target.innerText
    setNowPage(1)
    if (filterText === '文字') {
      setFilterProps({
        filterType: '文字',
        filterState,
        filterSearch,
        filterSort,
      })
    } else if (filterText === '繪畫') {
      setFilterProps({
        filterType: '繪畫',
        filterState,
        filterSearch,
        filterSort,
      })
    }
    if (filterText === '最熱門') {
      setFilterProps({
        filterType,
        filterState: '最熱門',
        filterSearch,
        filterSort,
      })
    } else if (filterText === '依價格') {
      filterSort = filterSort === 'DESC' ? 'ASC' : 'DESC'
      setFilterProps({
        filterType,
        filterState: '依價格',
        filterSearch,
        filterSort,
      })
    } else if (filterText === '依時間') {
      filterSort = filterSort === 'DESC' ? 'ASC' : 'DESC'
      setFilterProps({
        filterType,
        filterState: '依時間',
        filterSearch,
        filterSort,
      })
    }
  }
  const handleSearch = (e) => {
    setNowPage(1)
    let searchText = e.target.value
    setSearchText(searchText)
    setTimeout(() => {
      setFilterProps({ filterType, filterState, filterSearch: searchText })
    }, 1000)
  }

  return (
    <>
      <div className="filter my-2 d-flex flex-column flex-lg-row align-items-center mb-4">
        <div className="filter-class d-flex align-items-center me-4 text-h3">
          <Link
            href={
              'http://localhost:3000/course/CMS?type=1' +
              (filterState ? '&state=' + filterState : '') +
              (filterSearch ? '&search=' + filterSearch : '')
            }
            onClick={handleFilter}
          >
            <span
              className={`handwriting btn1 text-h3 ${
                filterType === '文字' ? 'btn-active' : ''
              }`}
            >
              文字
            </span>
          </Link>
          <p className="mb-1 fs-5 text-h3">&nbsp;|&nbsp;</p>
          <Link
            href={
              'http://localhost:3000/course/CMS?type=2' +
              (filterState ? '&state=' + filterState : '') +
              (filterSearch ? '&search=' + filterSearch : '')
            }
            onClick={handleFilter}
          >
            <span
              className={`painting btn1 text-h3 ${
                filterType === '繪畫' ? 'btn-active' : ''
              }`}
            >
              繪畫
            </span>
          </Link>
        </div>
        <div className="filter-state d-flex align-items-center me-4">
          <Link
            href={
              'http://localhost:3000/course/CMS?state=1' +
              (filterType ? '&type=' + filterType : '') +
              (filterSearch ? '&search=' + filterSearch : '')
            }
            onClick={handleFilter}
          >
            <span
              className={`hot text-h3 btn1 ${
                filterState === '最熱門' ? 'btn-active' : ''
              }`}
            >
              最熱門
            </span>
          </Link>
          <p className="mb-1 fs-5 text-h3">&nbsp;|&nbsp;</p>
          <Link
            href={
              'http://localhost:3000/course/CMS?state=2' +
              (filterType ? '&type=' + filterType : '') +
              (filterSearch ? '&search=' + filterSearch : '')
            }
            onClick={handleFilter}
          >
            <span
              className={`price text-h3 btn1 ${
                filterState === '依價格' ? 'btn-active' : ''
              }`}
            >
              依價格
              {filterState == '依價格' &&
                (filterSort === 'DESC' ? <BsSortDown /> : <BsSortDownAlt />)}
            </span>
          </Link>
          <p className="mb-1 fs-5 text-h3">&nbsp;|&nbsp;</p>
          <Link
            href={
              'http://localhost:3000/course/CMS?state=3' +
              (filterType ? '&type=' + filterType : '') +
              (filterSearch ? '&search=' + filterSearch : '')
            }
            onClick={handleFilter}
          >
            <span
              className={`time text-h3 btn1 ${
                filterState === '依時間' ? 'btn-active' : ''
              }`}
            >
              依時間
              {filterState == '依時間' &&
                (filterSort === 'DESC' ? <BsSortDown /> : <BsSortDownAlt />)}
            </span>
          </Link>
        </div>
        <div className="search d-flex align-items-center">
          <span className="text-h3 text-primary me-1">搜尋:</span>
          <input type="text " className="searchText" onKeyUp={handleSearch} />
        </div>
        <div>
          {(filterType !== '' || filterState !== '' || filterSearch !== '') && (
            <a href="http://localhost:3000/course/overview">
              <span className="time text-h3 btn1 ms-2">取消篩選</span>
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .btn1,
        p {
          color: var(--my-secondary);
          transition: color 0.3s;
        }
        .btn1:hover {
          color: var(--my-notice);
        }

        .btn-active {
          color: var(--my-notice);
        }
      `}</style>
    </>
  )
}
