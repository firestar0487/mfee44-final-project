import React from 'react'

export default function Section5() {
  return (
    <>
      <div className="main-container" style={{ display: 'flex' }}>
        <div
          className="content-wrapper"
          style={{
            backgroundColor: '#f1f1ee',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <div className="text-section" style={{ margin: '100px 0px' }}>
            <div
              className="proverb"
              style={{
                color: '#404040',
                textAlign: 'center',
                width: '336px',
                font: '21px Noto Serif TC, sans-serif',
              }}
            >
              書寫，非筆墨所致，而心靈所至 —— 墨韻雅筆
            </div>
            <div
              className="insight"
              style={{
                color: '#929292',
                textAlign: 'center',
                marginTop: '30px',
                font: '16px Noto Serif TC, sans-serif',
              }}
            >
              透過每一滴墨水，連結每一次思考的深度
            </div>
            <div
              className="description"
              style={{
                color: '#929292',
                textAlign: 'center',
                marginTop: '30px',
                font: '400 11px Noto Serif TC, sans-serif',
              }}
            >
              從經典傳統到現代創新，每一支鋼筆都是對卓越工藝的致敬。
              <br />
              墨韻雅筆，為愛筆者傾心打造，為書寫者傳情達意。
              <br />
              點擊探索，開啟您與墨韻雅筆的非凡旅程。
            </div>
            <div
              className="writing-art"
              style={{
                color: '#7c7477',
                textAlign: 'center',
                margin: '30px 0px',
                font: '16px Noto Serif TC, sans-serif',
              }}
            >
              書寫藝術，筆尖流傳
            </div>
            <div
              className="explore-button"
              style={{
                border: '1.125px solid #7c7477',
                borderRadius: '37.5px',
                textAlign: 'center',
                font: '700 12px Noto Serif TC, sans-serif',
                color: '#7c7477',
                padding: '12px 60px',
                margin: '20px',
              }}
            >
              探索商品
            </div>
          </div>
        </div>
        <div
          className="footer-navigation"
          style={{
            width: '50%',
            backgroundColor: '#404040',
            position: 'relative',
          }}
        >
          <div
            className="top-button"
            style={{
              borderRadius: '50%',
              border: '0.75px solid #f1f1ee',
              boxShadow: '3px 3px 15px 0px #000',
              display: 'flex',
              width: '67px',
              flexDirection: 'column',
              height: '67px',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: '0',
              bottom: '0',
              color: '#f1f1ee',
            }}
          >
            TOP
          </div>
        </div>
      </div>
      <style jsx>{`
        .main-container {
          display: flex;
        }
        .content-wrapper {
          background-color: #f1f1ee;
          display: flex;
          /* 水平置中 */
          justify-content: center;
          /* 垂直置中 */
          align-items: center;
          width: 50%;
        }

        .text-section {
          margin: 100px 0px;
        }
        .proverb {
          color: #404040;
          text-align: center;
          width: 336px;
          font: 21px Noto Serif TC, sans-serif;
        }
        .insight {
          color: #929292;
          text-align: center;
          margin-top: 30px;
          font: 16px Noto Serif TC, sans-serif;
        }
        .description {
          color: #929292;
          text-align: center;
          margin-top: 30px;
          font: 400 11px Noto Serif TC, sans-serif;
        }
        .writing-art {
          color: #7c7477;
          text-align: center;
          margin: 30px 0px;
          font: 16px Noto Serif TC, sans-serif;
        }
        .explore-button {
          border: 1.125px solid #7c7477;
          border-radius: 37.5px;
          text-align: center;
          font: 700 12px Noto Serif TC, sans-serif;
          color: #7c7477;
          padding: 12px 60px;
          margin: 20px;
        }
        .footer-navigation {
          width: 50%;
          background-color: #404040;
          position: relative;
        }
        .top-button {
          border-radius: 50%;
          border: 0.75px solid var(--white, #f1f1ee);
          box-shadow: 3px 3px 15px 0px #000;
          display: flex;
          width: 67px;
          flex-direction: column;
          height: 67px;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 0;
          bottom: 0;
          color: #f1f1ee;
        }
      `}</style>
    </>
  )
}
