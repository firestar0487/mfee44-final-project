import React from 'react'

const InkProgressBar = ({
  percentage = '',
  text = '',
  bgc = '#f1f1ee',
  textColor = '#f1f1ee',
}) => {
  return (
    <div className="inkProgressBarWrapper">
      <div className="inkProgressBarInner" style={{ width: `${percentage}%` }}>
        <span className="inkPercentageText">
          {text} {`${percentage}%`}
        </span>
      </div>
      <style jsx>{`
        @keyframes inkFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .inkProgressBarWrapper {
          width: 100%;
          background-color: ${bgc}; /* 灰色背景 */
          border-radius: 50px;
          overflow: hidden;
        }

        .inkProgressBarInner {
          height: 25px;
          background: linear-gradient(-45deg, #333, #555, #333, #555);
          background-size: 200% 200%;
          animation: inkFlow 2s ease infinite;
          border-radius: 5px;
          text-align: right;
          padding-right: 5px;
          position: relative;
          overflow: hidden;
        }

        .inkPercentageText {
          color: ${textColor};
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  )
}

export default InkProgressBar
