import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import ProductCart from '@/components/myCart/productCart'
import CourseCart from '@/components/myCart/courseCart'
import OrderSummary from '@/components/myCart/orderSummary'
import CartCouppon from '@/components/myCart/cartCoupon'
import ShippingRule from '@/components/myCart/shippingRule'
import ProgressBar from '@/components/myCart/progressBar'

import { useRouter } from 'next/router'

//勾子context
import { useCart } from '@/hooks/user-cart'
import { useCheckout } from '@/hooks/use-checkout'

export default function CartIndex() {
  //Mui modal
  const [openDialog, setOpenDialog] = useState(false)

  const {
    // 購物車
    cart,
    cartGeneral,
    increment,
    decrement,
    removeCartItem,
    cartCourse,
    formatPrice,
  } = useCart()

  const {
    totalPrice,
    rawTotalPrice,
    coupons,
    selectedCouponID,
    selectCoupon,
    handleRadioChange,
  } = useCheckout()

  const router = useRouter()

  const handleNextSteap = () => {
    if (cart.length < 1) {
      setOpenDialog(true)
      return false
    }
    router.push('/cart/checkout')
  }

  return (
    <>
      <ProgressBar
        percentage={35}
        text={'結帳進度'}
        textColor={'var(--my-white)'}
      />
      <div className="row">
        {/* 左邊 */}
        <div className="col-lg-7">
          <ProductCart
            cartGeneral={cartGeneral}
            increment={increment}
            decrement={decrement}
            removeCartItem={removeCartItem}
          />
          <CourseCart cartCourse={cartCourse} removeCartItem={removeCartItem} />
        </div>
        {/* 右邊 */}
        <div className="col-lg-1 "></div>
        <div className="col-lg-4  mt-5">
          <OrderSummary
            rawTotalPrice={rawTotalPrice}
            totalPrice={totalPrice}
            checkoutPath={'/cart/checkout'}
            formatPrice={formatPrice}
            handleNextSteap={handleNextSteap}
            discount_value={selectCoupon.discount_value}
          />
          <CartCouppon
            key={'0527'}
            coupons={coupons}
            selectedCouponID={selectedCouponID}
            handleRadioChange={handleRadioChange}
          />
          <ShippingRule />

          <div
            onClick={() => {
              handleNextSteap()
            }}
            className="col-lg-8  my-button1 my-5 mx-auto rwd-button"
          >
            下一步
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'購物車'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="">
            請先添加商品到購物車,再進行操作
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>確認</Button>
        </DialogActions>
      </Dialog>
      <style jsx>{`
        .rwd-button {
          display: none;
        }
        @media (max-width: 991px) {
          .OrderSummary-container {
            position: static;
            top: 0&;
            left: 0;
          }
          .rwd-button {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
