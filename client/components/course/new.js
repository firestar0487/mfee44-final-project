import { useState } from 'react'
export default function New({ date, title, message }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <article className="new mb-3">
        <div className>
          <div className="d-flex">
            <div className="date">{date}</div>
            <div className="text_label">{title}</div>
          </div>
          <p
            className={`news_content ${open ? '' : 'message'}`}
            onClick={() => setOpen(!open)}
          >
            {message}
          </p>
        </div>
      </article>

      <style jsx>{`
        .date {
          margin-right: 10px;
        }

        .date,
        .text_label {
          font-weight: bold;
          font-size: 18px;
        }

        .message {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news_content {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
