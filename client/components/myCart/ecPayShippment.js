import React, { useState, useEffect } from 'react'
import { FaHandPointRight } from 'react-icons/fa'

export default function EcpayShipment({ shipping = '' }) {
  const [formHtml, setFormHtml] = useState('')

  useEffect(() => {
    if (formHtml) {
      // 檢查表單是否存在，然後提交
      const form = document.getElementById('_form_map')
      if (form) {
        form.submit()
      }
    }
  }, [formHtml]) // 當formHtml改變時觸發

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/ecpay-shipping/ecpay-shippment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // 需要傳送的數據
          body: JSON.stringify({ shipping }),
        }
      )
      const data = await response.json()
      if (data.status === 'success') {
        // 將綠界回傳的HTML表單設置到狀態中

        setFormHtml(data.data)
      } else {
        console.error('Error fetching ecpay shipment form:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      {/* 使用dangerouslySetInnerHTML顯示綠界的HTML表單 */}
      <div dangerouslySetInnerHTML={{ __html: formHtml }} />

      <button
        className="btn btn-primary  my-3   d-flex align-items-center"
        onClick={handleSubmit}
      >
        <FaHandPointRight />
        <span className="ms-2">選擇門市</span>
      </button>
    </div>
  )
}
