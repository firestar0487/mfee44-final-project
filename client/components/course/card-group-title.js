import { useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import Link from 'next/link'

function CardGroupTitle({ title, subTitle, linkUrl }) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h4 className="text-h2">{title}</h4>
          <p className="text-h3 text-primary d-none d-md-block">
            &nbsp;|&nbsp;
          </p>
          <h5 className="text-primary text-h3 d-none d-md-block">{subTitle}</h5>
        </div>
        <Link
          href={linkUrl}
          className="text-decoration-none d-flex align-items-center text-primary"
        >
          查看更多
          <BsChevronRight className="mt-1" />
        </Link>
      </div>

      <style jsx>{`
        p {
          margin-bottom: 12px;
        }
      `}</style>
    </>
  )
}

export default CardGroupTitle
