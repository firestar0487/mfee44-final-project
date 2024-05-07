import React from 'react'
import { FaPenNib } from 'react-icons/fa'

export default function ContactDiv() {
  return (
    <>
      <img className="img-fluid" src="/images/myService/isp55.jpg" alt="" />
      <div className="slogan shape-ex1">
        <div className="text-h2">Ink the Moments, Script Your Style.</div>
        <hr />
        <h5>書寫的藝術傳承</h5>
        <p>
          匯聚世界級鋼筆，提供超過四十款精選筆款。從經典款到限量版
          <br />
          ，每一支鋼筆都是工匠精神的傳承。
          <br />
          不僅外型典雅，書寫流暢度更是無與倫比。
        </p>
      </div>
      <div
        className="contact w-25 text-center shape-ex2 bg-my-gray"
        d-flex=""
        flex-column=""
      >
        <h3 className="text-h2">聯絡我們</h3>
        <form action="" className="text-end">
          <div className='d-flex justify-content-center'>
            <label htmlFor="title" className='text-h4'>主旨</label>
            <input
              id="title"
              className="w-70"
              type="text"
              placeholder="主旨"
            />
          </div>
          <div className='d-flex justify-content-center'>
            <label htmlFor="mail" className='text-h4'>信箱</label>
            <input
              id="mail"
              className="w-70"
              type="email"
              placeholder="電子郵件"
            />
          </div>
          <textarea
            className="w-75 mx-auto"
            name=""
            id="opinion"
            cols={30}
            rows={5}
            placeholder="意見內容"
            defaultValue={''}
          />
          <button type="submit">
            <FaPenNib size={32} />
          </button>
        </form>
      </div>
      <style jsx>{`
        .slogan {
          position: absolute;
          top: 25%;
          left: 3%;
        }
        .slogan div.text-h2{
          font-size:26px;
          font-weight:700;
        }
        .slogan p,
        .slogan h5 {
          text-align: left;
        }
        .shape-ex1 {
          margin: 0 auto;
          animation: fade 2s linear 1, leftIn 3s linear 1s 1;

        }
        .shape-ex2 {
          margin: 0 auto;
          animation: fade 2s linear 1, rightIn 3s linear 1s 1;

        }
        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes leftIn {
          from {
            transform: translate3d(-40%, 0, 0);
          }
          to {
            transform: none;
          }
        }
        @keyframes rightIn {
          from {
            transform: translate3d(40%, 0, 0);
          }

          to {
            transform: none;
          }
        }

        .contact {
          position: absolute;
          top: 20%;
          right: 5%;
          background-color: rgba(146, 146, 146, 0.3);
          border-radius: 10px;
        }
        .contact input,
        .contact textarea {
          display: block;
          margin-block: 3px;
          background-color: #ffffff00;
          border: 0px;
          border-bottom: 2px solid rgb(0, 0, 0);
        }
        #opinion {
          background-color: #ffffff76;
        }
        button {
          color: white;
          background-color: transparent;
          border: none;
          margin: 5px;
        }
      `}</style>
    </>
  )
}
