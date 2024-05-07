import React from 'react'
import {
  MdLocalShipping,
  MdPerson,
  MdReceiptLong,
  MdOutlinePayments,
} from 'react-icons/md'

import { HiOutlineTicket } from 'react-icons/hi2'

export default function OrderConfirmList({ formData = {}, selectCoupon = {} }) {
  const shippingTypeMapping = {
    OKMARTC2C: 'OK超商',
    UNIMARTC2C: '統一超商',
    FAMIC2C: '全家超商',
  }

  // 使用formData.shipping的值來獲取對應的字符串
  const shippingType = shippingTypeMapping[formData.shipping] || '未知' // 如果formData.shipping不是1、2、3之一，則顯示'未知'
  return (
    <div className="container my-4">
      <div className="card shadow-sm mb-4 border-0 rounded-lg">
        <div className="card-header bg-primary text-my-white">
          <h4 className="mb-0 text-h4 text-my-white d-flex  align-items-center">
            <MdPerson className="me-2" size="24px" />
            收件人資料
          </h4>
        </div>
        <ul className="list-group">
          <li className="list-group-item border-0 text-h5 text-my-balck">
            <span className="">姓名：</span>
            <span className="firstname ">{formData.firstName}</span>{' '}
            <span className="lastname ">{formData.lastName}</span>
          </li>
          <li className="list-group-item border-0 text-h5 text-my-balck ">
            <span>電子郵件：</span>
            <span className="email">{formData.email}</span>
          </li>
          <li className="list-group-item border-0 text-h5 text-my-balck">
            <span>手機號碼：</span>
            <span className="mobile">{formData.mobilePhone}</span>
          </li>
        </ul>
      </div>

      <div className="card shadow-sm mb-4 border-0 rounded-lg">
        <div className="card-header bg-secondary text-my-white">
          <h4 className="mb-0 text-h4 text-my-white d-flex align-items-center">
            <MdLocalShipping className="me-2" size="24px" />
            運送地址詳細資訊
          </h4>
        </div>
        {formData.shipping !== '宅配' ? (
          <ul className="list-group ">
            <li className="list-group-item border-0 text-h5 text-my-balck">
              <span>門市類型：</span>
              <span className="country">{shippingType}</span>
            </li>
            <li className="list-group-item border-0 text-h5 text-my-balck">
              <span>門市：</span>
              <span className="township">{formData.storeName}</span>
            </li>
            <li className="list-group-item border-0 text-h5 text-my-balck">
              <span>門市地址：</span>
              <span className="address">{formData.storeAddress}</span>
            </li>
          </ul>
        ) : (
          <ul className="list-group ">
            <li className="list-group-item border-0 text-h5 text-my-balck">
              <span>城市：</span>
              <span className="country">{formData.country}</span>
            </li>
            <li className="list-group-item border-0 text-h5 text-my-balck">
              <span>區域：</span>
              <span className="township">{formData.township}</span>
            </li>
            <li className="list-group-item border-0 text-h5 text-my-balck">
              <span>地址：</span>
              <span className="address">{formData.address}</span>
            </li>
          </ul>
        )}
      </div>

      <div className="card shadow-sm mb-4 border-0 rounded-lg">
        <div className="card-header bg-primary text-my-white ">
          <h4 className="mb-0 text-h4 text-my-white d-flex align-items-center">
            <HiOutlineTicket className="me-2" size="24px" />
            優惠卷詳細資訊
          </h4>
        </div>
        <div className="card-body">
          <div className="card-text text-h5 text-my-balck">
            <span>優惠卷名稱：</span>
            <span className="coupon-name">{selectCoupon.coupon_name}</span>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4 border-0 rounded-lg">
        <div className="card-header bg-secondary text-my-white">
          <h4 className="mb-0 text-h4 text-my-white d-flex align-items-center">
            <MdReceiptLong className="me-2" size="24px" />
            電子發票詳細資訊
          </h4>
        </div>
        <div className="card-body">
          <div className="card-text text-h5 text-my-balck">
            <span>發票類型-</span>
            {formData.invoiceType === '3' ? (
              <>
                <span className="invoiceType">手機條碼載具：</span>
                <span className="mobileBarcode">{formData.mobileBarcode}</span>
              </>
            ) : null}
            {formData.invoiceType === '2' ? (
              <>
                <span className="invoiceType">雲端發票-捐贈</span>
              </>
            ) : null}
            {formData.invoiceType === '1' ? (
              <>
                <span className="invoiceType">非營業人電子發票</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4 border-0 rounded-lg">
        <div className="card-header bg-primary text-my-white">
          <h4 className="mb-0 text-h4 text-my-white d-flex align-items-center">
            <MdOutlinePayments className="me-2" size="24px" />
            支付方式詳細資訊
          </h4>
        </div>
        <div className="card-body">
          <div className="card-text text-h5 text-my-balck">
            <span>支付方式：</span>
            <span className="payType ">{formData.payType}</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* CustomStyles.css */

        .card {
          transition: transform 0.3s ease-in-out;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .container > div {
          border-radius: 10px;
        }
        .container ul {
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}
