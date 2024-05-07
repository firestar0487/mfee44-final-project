import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { useRouter } from 'next/router'

export default function CartFlow() {
  // 添加 activeStep 作为组件的 props

  const pathname = useRouter().pathname

  let content
  switch (pathname) {
    case '/cart':
      content = '我的購物車'
      break
    case '/cart/checkout':
      content = '收件人與運送資料'
      break
    case '/cart/confirmation':
      content = '檢查訂單'
      break
    default:
      content = '未知頁面'
  }

  const steps = ['我的購物車', '收件人與運送資料', '檢查訂單', '付款']

  return (
    <>
      <ul className="cartflow-container">
        {steps.map((step, index) => (
          <li key={index} className="text-h5">
            <div
              className={`text-my-white icon ${
                content === step ? 'active' : ''
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`mx-4 icon-text ${content === step ? 'active' : ''}`}
            >
              {step}
            </span>
            {index === 3 ? (
              ''
            ) : (
              <MdArrowForwardIos color="#929292" size="13.5px" />
            )}
          </li>
        ))}
      </ul>
      {steps.map(
        (step, index) =>
          content === step && (
            <div className="page-title d-flex align-items-center" key={index}>
              <div className="title-icon text-h2 d-flex justify-content-center align-items-center">
                {index + 1}
              </div>
              <span className="text-h3 mx-3 text-my-black ">{step}</span>
            </div>
          )
      )}
      <style jsx>{`
        .cartflow-container {
          display: flex;
          justify-content: space-around;

          & li {
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 20px;
              height: 20px;
              background-color: var(--my-gray);
              border-radius: 50%;
            }
            .icon.active {
              background-color: var(--my-black);
            }
            .icon-text {
              color: var(--my-gray);
            }
            .icon-text.active {
              color: var(--my-black);
            }
          }
        }
        @media (max-width: 991px) {
          .cartflow-container {
            display: none;
          }
        }

        .title-icon {
          width: 40px;
          height: 40px;
          color: var(--my-white);
          background-color: var(--my-black);
          border-radius: 50%;
        }
        .page-title {
          margin-top: 50px;
        }
      `}</style>
    </>
  )
}
