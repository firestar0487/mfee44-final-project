import React, { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <div className="input-group position-relative d-inline-flex align-items-center">
        <input
          type="text"
          className="form-control border-end-1 bg-transparent"
          placeholder="搜尋"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="search"
          aria-describedby="search"
          style={{
            borderRadius: 100,
            outline: '0.5px solid',
          }}
        />
        <button
          type="submit"
          className="bi bi-search position-absolute"
          style={{
            right: 10,
            cursor: 'pointer',
            zIndex: 100,
            backgroundColor: 'white',
            border: 'none',
          }}
        ></button>
      </div>
    </form>
  )
}
