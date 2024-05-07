import React, { useState } from 'react'

function FlipCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`box ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="card front"></div>
      <div className="card back"></div>
      <style jsx>{`
        .box {
          margin: 50px auto;
          width: 239px;
          height: 334px;
          position: relative;
          transform-style: preserve-3d;
          transition: 1s ease;
          transform: ${flipped ? 'rotateY(180deg)' : 'none'};
        }
        .card {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
        }
        .front {
          background-image: url(https://i.imgur.com/HnGloLn.png);
          background-size: cover;
        }
        .back {
          background-image: url(https://i.imgur.com/Ku1mbP7.jpg);
          background-size: cover;
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

export default FlipCard
