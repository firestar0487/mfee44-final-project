// ShippingForm.jsx
import React, { useState } from 'react'

function ShippingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    storeId: '', // 用户选择的7-11门市ID
    // 其他需要的信息...
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="receiverName"
        value={formData.receiverName}
        onChange={handleChange}
        placeholder="收件人姓名"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="联系电话"
        required
      />
      <input
        name="storeId"
        value={formData.storeId}
        onChange={handleChange}
        placeholder="7-11门市ID"
        required
      />
      {/* 其他字段 */}
      <button type="submit">提交</button>
    </form>
  )
}

export default ShippingForm
