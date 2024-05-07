import React from 'react'

export default function Section4() {
  return (
    <>
      <div className="homepage_section">
        <div className="service_overview_container">
          <div className="service_header">服務項目</div>
          <div className="service_subtitle">Service</div>
          <div className="service_categories">
            <div className="category_details">
              <div className="category_list">
                <div className="category_item">
                  <div className="item_card">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7efa74b0c8d39de02e9bd1bfbcf065f0d15fb5996e99fefc5ec87fdcb2d66032?apiKey=9b7c1561c5024fd5b29e05dac2b8f7ef&width=100 100w, [other resolutions]"
                      className="img-2"
                      alt="" // Ensure to provide an alt attribute for accessibility
                    />
                    <div className="item_category_title">商務</div>
                    <div className="item_description">
                      在"墨韻雅筆"，我們理解您的鋼筆不僅僅是書寫工具，它還是您珍貴的伙伴和藝術品。因此，提供專業的維修和保養服務，確保您的愛筆始終保持最佳狀態。
                    </div>
                    <div className="item_read_more">完整內容</div>
                  </div>
                </div>
                {/* Repeat for each category_item */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`  
  .homepage_section {
    background-color: var(--white, #f1f1ee);
    display: flex;
    flex-direction: column;
  }
  .service_overview_container {
    disply: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    display: flex;
    min-height: 885px;
    width: 100%;
  }
  @media (max-width: 991px) {
    .service_overview_container {
      max-width: 100%;
    }
  }


 .service_subtitle {
    position: relative;
    color:#7c7c74;
    text-align: center;
    align-self: center;
    font: 400 59px Gideon Roman, sans-serif;
  }
  @media (max-width: 991px) {
    .service_subtitle {
      margin-top: 40px;
      font-size: 40px;
    }
  }
  .service_categories {
    position: relative;
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-around
  }
  @media (max-width: 991px) {
    .service_categories {
      max-width: 100%;
      padding: 0 20px;
    }
  }
  .category_details {
    width: 100%;
    max-width: 1100px;
    padding: 0 1px;
  }
  @media (max-width: 991px) {
    .category_details {
      max-width: 100%;
    }
  }
  .category_list {
    gap: 20px;
    display: flex;
  }
  @media (max-width: 991px) {
    .category_list {
      flex-direction: column;
      align-items: stretch;
      gap: 0px;
      
    }
  }
.category_item {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 33%;
    margin:0px 30px;
  
  }
  @media (max-width: 991px) {
    .category_item {
      width: 100%;
    }
  }
  .item_card {
    border: 0.75px solid #000;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    color: var(--black, #404040);
    width: 100%;
    padding: 2px 0 32px;
  }
  @media (max-width: 991px) {
    .item_card {
      margin-top: 40px;
      white-space: initial;
    }
  }
  .img-2 {
    aspect-ratio: 1.23;
    object-fit: auto;
    object-position: center;
    width: 100%;
    align-self: stretch;
  }
  .item_category_title {
    margin-top: 19px;
    font: 900 29px Noto Serif TC, sans-serif;
    padding-left:10px;
    text-align: start;
  }
  .item_description {
    text-align: start;
    letter-spacing: 2.4px;
    margin: 11px;
    font: 400 12px/24px Noto Serif TC, -apple-system, Roboto, Helvetica,
      sans-serif;
    
    
  }
  .item_read_more {
    font-feature-settings: "clig" off, "liga" off;
    border-radius: 37.5px;
    border: 1.125px solid var(--black, #404040);
    margin-top: 19px;
    width: 228px;
    max-width: 100%;
    padding: 13px 20px;
    text-align:center;
    font: 700 16px Noto Serif TC, sans-serif;
    display: block;
  margin-left: auto;
  margin-right: auto;
  }
  @media (max-width: 991px) {
    .item_read_more {
      white-space: initial;
      padding: 0 20px;
    }
  }
.service_header{
  position: relative;
    color:#404040
    text-align: center;
    align-self: center;
    font: 400 40px Gideon Roman, sans-serif;
  }
`}
      </style>
    </>
  )
}
