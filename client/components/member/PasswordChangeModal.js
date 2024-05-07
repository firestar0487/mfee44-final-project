import React, { useState } from 'react'

const PasswordChangeModal = ({ onclose }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // 您可以在這裡添加密碼驗證邏輯
    // 然後將新密碼發送到後端進行更新
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    })
    // 如果密碼更新成功，可以呼叫 onClose 來關閉模態框
    onclose()
  }
  return (
    <div className="password-change-container">
      <div className="password-change-header">
        <div className="password-change-title">修改密碼</div>
        <div className="password-change-required-notice">必需填寫項目*</div>
      </div>
      <form className="password-change-form" onSubmit={handleSubmit}>
        <label className="current-password-label">
          當前登入密碼*
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="current-password-input"
            required
          />
        </label>
        <label className="new-password-label">
          輸入新登錄密碼*
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="new-password-input"
            required
          />
        </label>
        <label className="confirm-password-label">
          確認新登錄密碼*
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="confirm-password-input"
            required
          />
        </label>
        <button type="submit" className="confirm-button">
          確認
        </button>
      </form>
    </div>
  )
}

export default PasswordChangeModal
