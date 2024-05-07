import React from 'react';

const OrderHistory = () => {
    return (
        <>
            <div className="order-page">
                <div className="order-content">
                    <div className="order-header">我的訂單</div>
                    <div className="current-orders-title">現有訂單</div>
                    <div className="current-orders-list"></div>
                    <div className="past-orders-title">過往訂單</div>
                    <div className="past-orders-list"></div>
                </div>
            </div>
            <style jsx>{`
        .order-page {
    background-color: #f6f5f3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    color: #19110b;
    font-weight: 700;
    text-transform: uppercase;
    padding: 10px 60px;
  }
  @media (max-width: 991px) {
    .order-page {
      padding: 0 20px;
    }
  }
  .order-content {
    display: flex;
    margin-top: 20px;
    width: 100%;
    max-width: 1200px;
    flex-direction: column;
  }
  @media (max-width: 991px) {
    .order-content {
      max-width: 100%;
      margin-top: 40px;
    }
  }
  .order-header {
    border-bottom: 1px solid #eae8e4;
    white-space: nowrap;
    padding: 5px 0 30px;
    font:26px Inter, sans-serif;
  }
  @media (max-width: 991px) {
    .order-header {
      max-width: 100%;
      white-space: initial;
    }
  }
  .current-orders-title {
    font-family: Inter, sans-serif;
    margin-top: 36px;
  }
  @media (max-width: 991px) {
    .current-orders-title {
      max-width: 100%;
    }
  }
  .current-orders-list {
    background-color: #fff;
    margin-top: 28px;
    height: 77px;
  }
  @media (max-width: 991px) {
    .current-orders-list {
      max-width: 100%;
    }
  }
  .past-orders-title {
    font-family: Inter, sans-serif;
    margin-top: 36px;
  }
  @media (max-width: 991px) {
    .past-orders-title {
      max-width: 100%;
    }
  }
  .past-orders-list {
    background-color: #fff;
    margin-top: 28px;
    height: 77px;
  }
  @media (max-width: 991px) {
    .past-orders-list {
      max-width: 100%;
    }
  }
      `}</style>
        </>
    );
};

export default OrderHistory;
