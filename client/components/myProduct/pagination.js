import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null
  }

  let startPage = Math.max(1, currentPage - 1)
  let endPage = Math.min(totalPages, startPage + 2)

  if (endPage - startPage < 2) {
    endPage = Math.min(totalPages, currentPage + 1)
    startPage = Math.max(1, endPage - 2)
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  )

  const handlePageChange = (page) => {
    onPageChange(page)
  }

  return (
    <nav
      className="d-flex justify-content-center align-items-center"
      aria-label="Page navigation"
    >
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            aria-label="First"
            onClick={() => handlePageChange(1)}
          >
            <span aria-hidden="true">&laquo;&laquo;</span>
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        {totalPages > 3 && endPage < totalPages && (
          <li className="page-item disabled">
            <span className="page-link">&hellip;</span>
          </li>
        )}
        {totalPages > 3 && endPage < totalPages && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </a>
          </li>
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Last"
            onClick={() => handlePageChange(totalPages)}
          >
            <span aria-hidden="true">&raquo;&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
