import * as React from 'react'
import {
  BsInstagram,
  BsYoutube,
  BsFacebook,
  BsLinkedin,
  BsTwitterX,
} from 'react-icons/bs'

export default function Footer(props) {
  // icon與url
  const iconsData = [
    {
      icon: <BsInstagram />,
      url: 'https://www.instagram.com/',
    },
    {
      icon: <BsFacebook />,
      url: 'https://www.facebook.com/',
    },
    {
      icon: <BsTwitterX />,
      url: 'https://twitter.com/',
    },
    {
      icon: <BsYoutube />,
      url: 'https://www.youtube.com/',
    },
    {
      icon: <BsInstagram />,
      url: 'https://www.linkedin.com/',
    },
  ]
  return (
    <div className="footer mt-auto bg-primary">
      <div className="footer-container ">
        <div className="footer-content">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/08548d5c1f59901f4b574f1c0d70e829ce18b9723833ec5d9a774d11f9945f34?apiKey=549d2602ce5843b4bd5df38129685e36&"
            className="footer-logo"
          />
          <div className="footer-text">
            Copyright © 2023 Elegant Script Pens. All rights reserved
          </div>
          <div className="social-icons">
            {iconsData.map((v, i) => {
              return (
                <a className="social-icon" href={v.url} key={i}>
                  {v.icon}
                </a>
              )
            })}
          </div>
        </div>
        <div className="footer-links">
          <div className="right-text">
            <div className="column">
              <div className="links-section">
                <div className="links-title">最新消息</div>
                <a href="#">Products</a>
                <a href="#">Rooms</a>
                <a href="#">Inspirations</a>
              </div>
            </div>
            <div className="column-2">
              <div className="links-section">
                <div className="links-title">服務項目</div>
                <a href="#">Products</a>
                <a href="#">Rooms</a>
                <a href="#">Inspirations</a>
              </div>
            </div>
            <div className="column-3">
              <div className="links-section">
                <div className="links-title">關於我們</div>
                <a href="#">Products</a>
                <a href="#">Rooms</a>
                <a href="#">Inspirations</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-container {
          justify-content: space-between;
          background-color: var(--my-primary);
          display: flex;
          gap: 20px;
          padding: 35px 80px;
          max-width: 1440px;
          margin: 0 auto;
        }
        @media (max-width: 991px) {
          .footer-container {
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          padding: 0 50px 30px;
        }
        @media (max-width: 991px) {
          .footer-content {
            margin: 40px auto;
            padding: 0 20px;
          }
        }
        .footer-logo {
          object-fit: auto;
          object-position: center;
          width: 76px;
          align-self: center;
        }
        .footer-text {
          color: var(--white, #f1f1ee);
          text-align: center;
          margin-top: 39px;
          white-space: nowrap;
          font: 400 11px Noto Serif TC, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .footer-text {
            white-space: initial;
          }
        }
        .social-icons {
          justify-content: space-between;
          display: flex;
          margin-top: 18px;
          gap: 20px;
        }
        .social-icon {
          font-size: 24px;
          color: var(--my-white);
        }

        .footer-links {
          justify-content: center;
          margin: auto 0;
          padding: 1px 3px;
        }
        @media (max-width: 991px) {
          .footer-links {
            display: none;
          }
        }

        .right-text {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .right-text {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .links-section {
          display: flex;
          flex-grow: 1;
          padding-bottom: 7px;
          flex-direction: column;
          font-size: 11px;
          color: var(--my-white);
          font-weight: 400;
          white-space: nowrap;

          & > a:nth-child(n + 2) {
            margin-top: 23px;
            color: var(--my-white);
            text-decoration: none;
          }
        }
        @media (max-width: 991px) {
          .links-section {
            margin-top: 35px;
            white-space: initial;
          }
        }
        .links-title {
          color: var(--notice, #ff0083);
          font-feature-settings: 'clig' off, 'liga' off;
          font: 700 12px Noto Serif TC, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }

        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-3 {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
