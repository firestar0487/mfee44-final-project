import React from 'react'

export default function SearchForm() {
  return (
    <div className="ms-auto pe-3 mt-3 mt-lg-2">
      <form className="d-flex" role="search">
        <div className="input-group position-relative d-inline-flex align-items-center">
          <input
            type="text"
            className="form-control border-end-1 bg-transparent "
            placeholder="搜尋"
            aria-label="from"
            aria-describedby="from"
            style={{
              borderRadius: 100,
              outline: `0.5px solid`,
            }}
          />
          <i
            className="bi bi-search position-absolute "
            role="presentation"
            style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
          ></i>
        </div>
      </form>
    </div>
  )
}
