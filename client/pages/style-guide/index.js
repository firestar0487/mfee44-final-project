import React from 'react'
import { Autoplay } from 'swiper/modules'

export default function TestPage() {
  return (
    <>
      <h1>Style Guide</h1>
      <hr />
      <h3 className="mb-4">【Typography】</h3>
      <div className="row gap-3">
        <div className="col text-h1 ">我是H1</div>
        <div className="col text-h2 ">我是H2</div>
        <div className="col text-h3 ">我是H3</div>
        <div className="col text-h4 ">我是H4</div>
        <div className="col text-h5 ">我是H5</div>
        <div className="col text-h6 ">我是H6</div>
      </div>
      <hr />
      <h3 className="mb-4">【Color】</h3>
      <div className="row gap-3">
        <div className="col  bg-my-primary text-white text-center">primary</div>
        <div className="col bg-my-secondary text-white text-center">
          secondary
        </div>
        <div className="col bg-my-notice text-white text-center">notice</div>
        <div className="col bg-my-notice-light text-white text-center">
          notice-light
        </div>
        <div className="col bg-my-black text-white text-center">black</div>
        <div className="col bg-my-gray text-white text-center">gray</div>
        <div className="col bg-my-white text-black text-center">white</div>
      </div>
      <hr />
      <h3 className="mb-4">【Ｔext-content】</h3>
      <div className="row">
        <div style={{ width: 400 }} className="col-6">
          <h6>中文-</h6>
          <p className="my-text-contents-CH">
            匯聚世界級鋼筆，提供超過四十款精選筆款。從經典款到限量版，每一支鋼筆都是工匠精神的傳承。不僅外型典雅，書寫流暢度更是無與倫比。
          </p>
        </div>
        <div style={{ width: 400 }} className="col-6">
          <h6>英文-</h6>
          <p className="my-text-contents-EN">
            Sit nullam habitant vestibulum odio at scelerisque ornare nulla
            scelerisque.
          </p>
        </div>
      </div>
      <hr />
      <h3>【button】</h3>
      <a className="my-button1">我是按鈕</a>
    </>
  )
}
