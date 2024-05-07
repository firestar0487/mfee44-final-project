import * as React from 'react'
import Link from 'next/link'
import { BsCreditCard, BsTruck, BsArrowLeftRight } from 'react-icons/bs'

export default function ShippingRule(props) {
  return (
    <>
      <div className="rule-container">
        <div>
          <Link href="/#" style={{ textDecoration: 'none' }}>
            <div className="rule-body text-my-black">
              <BsCreditCard size={30} />
              <div className="rule-text text-my-black">
                <div className="text-h3">付款方式</div>
                <div className="text-h6">信用卡或銀行轉帳</div>
              </div>
            </div>
          </Link>
          <Link href="/#" style={{ textDecoration: 'none' }}>
            <div className="rule-body mt-4 text-my-black  ">
              <BsTruck size={30} />
              <div className="rule-text text-my-black">
                <div className="text-h3">訂單配送</div>
                <div className="text-h6">免費送貨&專門店取貨</div>
              </div>
            </div>
          </Link>
          <Link href="/#" style={{ textDecoration: 'none' }}>
            <div className="rule-body  mt-4 text-my-black">
              <BsArrowLeftRight size={30} />
              <div className="rule-text text-my-black">
                <div className="text-h3">退換貨規定</div>
                <div className="text-h6">免費退換貨</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .rule-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-left: 50px;
          margin-top: 40px;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .rule-container {
            padding-left: 0px;
            white-space: initial;
            letter-spacing: 0.2rem;
          }
        }

        .rule-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          color: var(--my-black);
          padding: 4px 80px 36px 0;
          transition: all 0.5s;
          &:hover,
          .rule-text:hover {
            color: var(--my-notice);
          }
        }
        @media (max-width: 991px) {
          .rule-body {
            padding-right: 20px;
            margin-top: 40px;
            white-space: initial;
            border-bottom: none;
          }
        }

        .rule-text {
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
          transition: all 0.5s;
        }
        @media (max-width: 991px) {
          .rule-text {
            white-space: initial;
          }
        }
      `}</style>
    </>
  )
}
