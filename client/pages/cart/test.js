import React, { useState, useEffect } from 'react'

export default function EcpayShipment() {
  const [formHtml, setFormHtml] = useState('')
  console.log(formHtml)

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
          body: JSON.stringify({}),
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
      <button onClick={handleSubmit}>Load Ecpay Shipment Form</button>
      {/* 使用dangerouslySetInnerHTML顯示綠界的HTML表單 */}
      <div dangerouslySetInnerHTML={{ __html: formHtml }} />
    </div>
  )
}
