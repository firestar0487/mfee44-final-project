import React from 'react'

export default function TimeFilter({
  openTime,
  setOpenTime,
  closeTime,
  setCloseTime,
}) {
  return (
    <>
      <input
        className="choose-time"
        type="time"
        value={openTime}
        onChange={(e) => setOpenTime(e.target.value)}
      />
      to
      <input
        className="choose-time"
        type="time"
        value={closeTime}
        onChange={(e) => setCloseTime(e.target.value)}
      />
      <style jsx>{`
        .choose-time {
          min-width: 126px;
        }
      `}</style>
    </>
  )
}
