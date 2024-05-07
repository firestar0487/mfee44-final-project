import { createContext, useState, useContext, useEffect } from 'react'
import { useCart } from '@/hooks/user-cart'
/* 資料庫資料 */
//優惠卷(暫時)
// import couponsData from '@/data/coupon.json'
// import ianCoupon from '@/data/ianCoupon.json'

//地區資料
import { countries, townships, postcodes } from '@/data/data-townships'

//1.建立與導出
export const CheckoutContext = createContext(null)
// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
export function CheckoutProvider({ children }) {
  const { cart } = useCart()

  // 共享用狀態(state)
  const [totalPrice, setTotalPrice] = useState(0)

  const [formData, setFormData] = useState({
    shipping: '', //默認宅配,後續新增7-11物流
    shippingFee: '',
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    // 宅配信息
    country: '',
    township: '',
    postcode: '',
    address: '',
    // 門市自取信息
    storeID: '',
    storeType: '',
    storeName: '',
    storeAddress: '',
    // 共用信息
    invoiceType: '', //1非營業人電子發票 ２捐贈（默認）  3手機條碼
    mobileBarcode: '', //手機載具 當invoiceType為3時,才會有資料
    payType: '', //支付類型
  })

  /* 處理formData */
  //初始化 localstorage資料提取到cart
  useEffect(() => {
    if (localStorage.getItem('check_info')) {
      const clientFormData = JSON.parse(localStorage.getItem('check_info'))
      setFormData(clientFormData)
    }
  }, [])
  /* 處理優惠卷 */

  const [coupons, setCoupons] = useState([])
  const [selectedCouponID, setSelectedCouponID] = useState('none')
  const [selectCoupon, setSelectCoupon] = useState({})
  console.log(selectCoupon.discount_value)

  //處理資料庫過來的優惠卷資料
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/coupon/userCoupon',
        {
          method: 'GET',
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const newCouponsData = await response.json()
      const validCoupons = newCouponsData.filter((v) => v.coupon_valid !== 0)
      setCoupons(validCoupons)
    } catch (error) {
      console.error('Error fetching coupons:', error)
    }
  }
  console.log(coupons)
  //初始化 localstorage資料提取到selectCoupon
  useEffect(() => {
    if (localStorage.getItem('selectedCouponID')) {
      const clientSelectedCouponID =
        localStorage.getItem('selectedCouponID') || 'none'
      setSelectedCouponID(clientSelectedCouponID)
    }
  }, [])

  useEffect(() => {
    handleSelectCoupon(coupons, selectedCouponID)
  }, [selectedCouponID, coupons])

  const handleSelectCoupon = (coupponsArray, coupon_code) => {
    const [newSelectCoupon] = coupponsArray.filter(
      (v) => coupon_code === v.coupon_code
    )

    if (newSelectCoupon) {
      setSelectCoupon(newSelectCoupon)
    } else {
      setSelectCoupon({
        coupon_code: 'none',
        coupon_name: '無',
        ValidFrom: '',
        ValidTo: '',
        MinimumSpend: 0,
        discount_value: 0,
        discount_type: '金額',
        DiscountValue: 0,
        UsageLimit: 0,
        UsedCount: 0,
      })
    }
  }

  const handleRadioChange = (e) => {
    // 更新當前優惠卷id
    const newSelectedCouponID = e.target.value
    setSelectedCouponID(newSelectedCouponID)
    localStorage.setItem('selectedCouponID', newSelectedCouponID)
  }

  // 小計金額（原始金額）
  const rawTotalPrice = cart.reduce((acc, v) => acc + v.qty * v.price, 0)

  //處理完畢優惠卷+運費金額
  useEffect(() => {
    const numericShippingFee = Number(formData.shippingFee)
    let discountAmount = 0
    if (selectCoupon && selectCoupon.discount_type === '金額') {
      discountAmount = selectCoupon.discount_value
      console.log(discountAmount)
    } else if (selectCoupon && selectCoupon.DiscountType === 'Percent') {
      discountAmount =
        cart.reduce((acc, v) => acc + v.qty * v.price, 0) *
        (selectCoupon.DiscountValue / 100)
    }

    const newTotalPrice =
      cart.reduce((acc, v) => acc + v.qty * v.price, 0) +
      numericShippingFee -
      discountAmount
    // 儲存最終金額
    setTotalPrice(newTotalPrice)
  }, [cart, formData.shippingFee, selectCoupon])

  return (
    <CheckoutContext.Provider
      value={{
        //收件資料
        formData,
        setFormData,
        //原價＆優惠價
        totalPrice,
        rawTotalPrice,
        //優惠卷
        coupons,
        selectedCouponID,
        selectCoupon,
        handleRadioChange,
        //地區資料
        countries,
        townships,
        postcodes,
      }}
      //用value屬性傳入共享用狀態(state)
    >
      {children}
    </CheckoutContext.Provider>
  )
}
// 給消費者們(consumers)，包裝好專用於此context的勾子名稱
export const useCheckout = () => useContext(CheckoutContext)
