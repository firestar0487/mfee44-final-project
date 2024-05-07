import React from 'react'

export default function Progress({ loading, setLoading }) {
  return (
    <>
      <div className="progress mt-4 mx-auto w-75 p-0">
        <div className={`progress-${loading ? 'loading' : 'bar'}`} />
      </div>
      <style jsx>{`
         {/* 發出請求時，會將className從progress-bar改成progress-loading，藉此執行動畫 */}
        .progress-bar {
          width: 0%;
          height: 100%;
        }

        .progress-loading {
          width: 0%;
          background-color: #ff0083;
          animation: fillProgress 0.6s linear; /* 填充动画，持续 0.6 秒，线性变化 */
        }
        @keyframes fillProgress {
          from {
            width: 0%; /* 初始宽度为 0% */
          }
          to {
            width: 100%; /* 最终宽度为 100% */
          }
        }
      `}</style>
    </>
  )
}
