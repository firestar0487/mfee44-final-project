import React, { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import { Form, Container, Collapse } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import styles from './checkoutProcessForm.module.scss'
import Link from 'next/link'

import { useRouter } from 'next/router'

//地區資料
import { countries, townships, postcodes } from '@/data/data-townships'

// icon
import { IoIosArrowRoundBack, IoIosFiling } from 'react-icons/io'
//component
import EcpayShipment from '../ecPayShippment'

import {
  MdLocalShipping,
  MdPerson,
  MdReceiptLong,
  MdOutlinePayments,
} from 'react-icons/md'

export default function CheckoutProcessForm({
  selectCoupon = {},
  setFormData = () => {},
}) {
  const router = useRouter()

  //Mui modal staus
  const [openDialog, setOpenDialog] = useState(false)

  const initialFormData = {
    shipping: '宅配', //默認宅配,後續新增7-11物流
    shippingFee: '200',
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
    // 優惠卷,
    coupon_id: '',
    coupon_name: '',
    // 共用信息
    invoiceType: '2', //1非營業人電子發票 ２捐贈（默認）  3手機條碼
    mobileBarcode: '', //手機載具 當invoiceType為3時,才會有資料
    payType: 'LinePay', //支付類型
  }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm({
    defaultValues: initialFormData,
  })

  const formData = watch()

  // 使用 watch 監控整個表單的變化
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      setFormData(value) // 將變化的表單數據更新到 Context 中
    })
    return () => subscription.unsubscribe()
  }, [watch, setFormData])

  useEffect(() => {
    // 假设你需要根据某些条件更新表单的默认值，可以在这里使用reset
    // 注意：这里直接使用initialFormData是因为我们模拟了初始值的场景
    // 在实际应用中，你可能需要根据实际来源动态获取这些值
    reset(initialFormData)
  }, [reset])

  // 使用 watch 監視 shipping 欄位的值
  const shipping = watch('shipping')

  // 監聽發票類型的變化
  const invoiceType = watch('invoiceType') // 監聽發票類型的變化
  //監聽宅配 地址
  const selectedCountryIndex = watch('country')
    ? countries.indexOf(watch('country'))
    : 0

  //  處理發票變化
  useEffect(() => {
    if (invoiceType !== '3') {
      setValue('mobileBarcode', '') // 如果發票類型不是3，清空 mobileBarcode
    }
  }, [invoiceType, setValue])

  useEffect(() => {
    // 確保路由器準備就緒後再嘗試讀取查詢參數
    if (!router.isReady) return

    // 從查詢參數中獲取門市類型
    const queryStoreType = router.query.storeType

    // 根據storeType設置shipping的預設值
    const defaultShipping = queryStoreType || '宅配' // 如果沒有指定storeType，則預設為'宅配'

    // 使用reset函數更新表單的預設值，包括根據storeType設置的shipping
    reset({
      ...initialFormData, // 使用展開運算符保持其他初始表單數據不變
      shipping: defaultShipping,
      // 可以在這裡添加其他基於storeType條件的表單欄位預設值設置
    })
  }, [router.isReady, router.query, reset])

  //處理運送方式與運費
  useEffect(() => {
    // 確保路由器準備就緒後再嘗試讀取查詢參數
    if (!router.isReady) return

    // 從查詢參數中獲取門市信息
    const queryStoreType = router.query.storeType
    const queryStoreID = router.query.storeID
    const queryStoreName = router.query.storeName
    const queryStoreAddress = router.query.storeAddress

    // 計算新的運費
    const newShippingFee = shipping !== '宅配' ? '80' : '200'
    setValue('shippingFee', newShippingFee)

    // 檢查當前選中的運送方式是否和門市類型匹配
    if (shipping !== queryStoreType) {
      // 如果不匹配，清空門市信息
      setValue('storeType', '')
      setValue('storeID', '')
      setValue('storeName', '')
      setValue('storeAddress', '')
    } else {
      // 如果匹配，更新門市信息（可選擇性地僅在信息為空時更新）
      setValue('storeType', queryStoreType || watch('storeType'))
      setValue('storeID', queryStoreID || watch('storeID'))
      setValue('storeName', queryStoreName || watch('storeName'))
      setValue('storeAddress', queryStoreAddress || watch('storeAddress'))
    }
  }, [router.isReady, router.query, shipping, setValue, watch])

  //處理postcode
  useEffect(() => {
    const postcodeValue =
      watch('country') && watch('township')
        ? postcodes[selectedCountryIndex]?.[
            townships[selectedCountryIndex].indexOf(watch('township'))
          ]
        : ''
    setValue('postcode', postcodeValue, { shouldValidate: true })
  }, [watch('country'), watch('township'), postcodes, setValue])

  /* ----------------------調整------------------------- */
  useEffect(() => {
    if (!router.isReady) return

    // 从查询参数中获取门市信息
    const { storeType, storeID, storeName, storeAddress } = router.query

    // 从 localStorage 中尝试恢复表单数据
    const storedData = localStorage.getItem('check_info')
    const formData = storedData ? JSON.parse(storedData) : {}

    // 将查询参数中的门市信息合并到表单数据中，查询参数优先
    const mergedFormData = {
      ...formData,
      ...(storeType && { shipping: storeType }),
      ...(storeID && { storeID }),
      ...(storeName && { storeName }),
      ...(storeAddress && { storeAddress }),
    }

    // 更新表单数据
    reset(mergedFormData)
  }, [router.isReady, router.query, reset])

  //處理couppon
  useEffect(() => {
    // 當 selectCoupon 改變時，使用 setValue 更新 React Hook Form 中的值
    setValue('coupon_id', selectCoupon.id || null)
    setValue('coupon_name', selectCoupon.coupon_name || '無')

    // 確保表單驗證是更新的（如果需要）
    // 這一步是可選的，取決於您是否需要在這些字段更新時觸發驗證
    // trigger(['coupon_id', 'coupon_name'])
  }, [selectCoupon, router.isReady])

  useEffect(() => {
    const storedData = localStorage.getItem('check_info')
    if (storedData) {
      setOpenDialog(true)
    }
  }, [])

  // const handleConfirm = () => {
  //   setOpenDialog(false)
  //   const storedData = localStorage.getItem('check_info')
  //   if (storedData) {
  //     const formData = JSON.parse(storedData)
  //     reset(formData)
  //   }
  // }

  const handleConfirm = () => {
    setOpenDialog(false)

    // 从 localStorage 中恢复之前的表单数据
    const storedData = localStorage.getItem('check_info')
    let formData = storedData ? JSON.parse(storedData) : {}

    // 从URL查询参数中获取新的门市信息
    const { storeType, storeID, storeName, storeAddress } = router.query

    // 如果URL中有门市信息，这意味着用户刚从电子地图选择了门市
    if (storeType || storeID || storeName || storeAddress) {
      // 使用URL中的门市信息更新表单数据
      formData = {
        ...formData,
        ...(storeType && { shipping: storeType }),
        ...(storeID && { storeID }),
        ...(storeName && { storeName }),
        ...(storeAddress && { storeAddress }),
      }
    }

    // 使用更新后的表单数据来重置表单
    reset(formData)
  }

  const handleCancel = () => {
    setOpenDialog(false)
    localStorage.removeItem('check_info')
    reset(initialFormData)
  }

  const onSubmit = (data) => {
    localStorage.setItem('check_info', JSON.stringify(data))

    console.log('data', data)
    router.push('/cart/confirmation')
  }

  return (
    <>
      <Container className="my-5 ">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <IoIosFiling className="me-2 text-my-black" size="24px" />
              收貨方式
            </h2>
            <Link href="/cart">
              <div className="d-flex align-items-center back-to-product-list ">
                <IoIosArrowRoundBack className="" size="18px" />
                返回購物車
              </div>
            </Link>
          </div>
          <Form.Group>
            {/* 使用 Controller 管理單選按鈕 */}
            <Controller
              control={control}
              name="shipping"
              render={({ field }) => (
                <Form.Select
                  {...field}
                  className="mt-4 text-h5 text-my-black"
                  id="shippingSelect"
                >
                  <option value="宅配">黑貓宅急便</option>
                  <option value="UNIMARTC2C">7-11收貨</option>
                  <option value="FAMIC2C">全家收貨</option>
                  <option value="OKMARTC2C">OK收貨</option>
                  {/* <option value="UNIMARTC2C-Y">7-11貨到付款</option>
                  <option value="FAMIC2C-Y">全家貨到付款</option>
                  <option value="OKMARTC2C-Y">OK貨到付款</option> */}
                </Form.Select>
              )}
            />
          </Form.Group>
        </div>
        {/* 根據選擇顯示不同表單區塊 */}
        {shipping === '宅配' && (
          // 宅配表單區塊
          <>
            {/* 宅配*/}
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <MdLocalShipping className="me-2 text-my-black" size="24px" />
              運送資料
            </h2>
            <Form.Group controlId="formCountry">
              <Form.Label className="text-h5 text-my-black">城市</Form.Label>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: shipping === '宅配' ? '城市為必填' : false,
                }}
                render={({ field }) => (
                  <>
                    <Form.Select {...field}>
                      <option value="">請選擇城市</option>
                      {countries.map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.country && (
                      <div className="text-danger">
                        {errors.country.message}
                      </div>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group controlId="formTownship">
              <Form.Label className="text-h5 text-my-black">鄉鎮區</Form.Label>
              <Controller
                name="township"
                control={control}
                rules={{
                  required: shipping === '宅配' ? '鄉鎮區為必填' : false,
                }}
                render={({ field }) => (
                  <>
                    <Form.Select {...field}>
                      <option value="">請選擇鄉鎮區</option>
                      {townships[selectedCountryIndex] &&
                        townships[selectedCountryIndex].map((v, i) => (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        ))}
                    </Form.Select>
                    {errors.township && (
                      <div className="text-danger">
                        {errors.township.message}
                      </div>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group controlId="formPostcode">
              <Form.Label className="text-h5 text-my-black">
                郵遞區號
              </Form.Label>
              <Controller
                name="postcode"
                control={control}
                render={({ field }) => (
                  <input className="form-control" {...field} readOnly />
                )}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label className="text-h5 text-my-black">地址</Form.Label>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: shipping === '宅配' ? '地址為必填' : false,
                  pattern: {
                    value:
                      /^[\u4e00-\u9fa5]+(路|街|巷)[\u4e00-\u9fa5\d]*[號巷弄樓]/,
                    message: '請輸入正確的台灣地址',
                  },
                }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="請輸入地址"
                    />
                    {errors.address && (
                      <div className="text-danger">
                        {errors.address.message}
                      </div>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </>
        )}

        {shipping === 'UNIMARTC2C' && (
          <>
            <div
              className="box-shadow "
              style={{
                padding: '1rem',
                backgroundColor: 'var(--my-white)',
                // border: '0.5px solid var(--my-black)',
                borderRadius: '5px',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <EcpayShipment shipping={shipping} />
              <p>
                <strong>超商類型:</strong> 統一超商
              </p>

              <p>
                <strong>門市名稱:</strong>
                <Controller
                  name="storeName"
                  control={control}
                  rules={{ required: '請選擇門市' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <span>{field.value}</span>
                      {error && (
                        <div style={{ color: 'red' }}>{error.message}</div>
                      )}
                    </>
                  )}
                />
              </p>

              <p>
                <strong>門市地址:</strong>
                <Controller
                  name="storeAddress"
                  control={control}
                  rules={{ required: '請選擇門市' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <span>{field.value}</span>
                      {error && (
                        <div style={{ color: 'red' }}>{error.message}</div>
                      )}
                    </>
                  )}
                />
              </p>

              <input type="hidden" {...register('storeName')} />
              <input type="hidden" {...register('storeAddress')} />
            </div>
          </>
        )}
        {shipping === 'FAMIC2C' && (
          <>
            <div
              className="box-shadow "
              style={{
                padding: '1rem',
                backgroundColor: 'var(--my-white)',
                // border: '0.5px solid var(--my-black)',
                borderRadius: '5px',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <EcpayShipment shipping={shipping} />
              <p>
                <strong>超商類型:</strong> 全家超商
              </p>
              <p>
                <strong>門市名稱:</strong>
                <Controller
                  name="storeName"
                  control={control}
                  rules={{ required: '請選擇門市' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <span>{field.value}</span>
                      {error && (
                        <div style={{ color: 'red' }}>{error.message}</div>
                      )}
                    </>
                  )}
                />
              </p>

              <p>
                <strong>門市地址:</strong>
                <Controller
                  name="storeAddress"
                  control={control}
                  rules={{ required: '請選擇門市' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <span>{field.value}</span>
                      {error && (
                        <div style={{ color: 'red' }}>{error.message}</div>
                      )}
                    </>
                  )}
                />
              </p>

              <input type="hidden" {...register('storeName')} />
              <input type="hidden" {...register('storeAddress')} />
            </div>
          </>
        )}
        {shipping === 'OKMARTC2C' && (
          <>
            {/* 門市*/}
            <div
              className="box-shadow "
              style={{
                padding: '1rem',
                backgroundColor: 'var(--my-white)',
                // border: '0.5px solid var(--my-black)',
                borderRadius: '5px',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <EcpayShipment shipping={shipping} />
              <p>
                <strong>超商類型:</strong> OK超商
              </p>
              <p>
                <strong>門市名稱:</strong>
                <Controller
                  name="storeName"
                  control={control}
                  rules={{ required: '請選擇門市' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <span>{field.value}</span>
                      {error && (
                        <div style={{ color: 'red' }}>{error.message}</div>
                      )}
                    </>
                  )}
                />
              </p>

              <p>
                <strong>門市地址:</strong>
                <Controller
                  name="storeAddress"
                  control={control}
                  rules={{ required: '請選擇門市' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <span>{field.value}</span>
                      {error && (
                        <div style={{ color: 'red' }}>{error.message}</div>
                      )}
                    </>
                  )}
                />
              </p>
              <input type="hidden" {...register('storeName')} />
              <input type="hidden" {...register('storeAddress')} />
            </div>
          </>
        )}
        <h2 className="text-h4 text-my-black my-5 d-flex align-items-center">
          <MdPerson className="me-2 text-my-black  " size="24px" />
          收件人資料
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label className="text-h5 text-my-black">姓</Form.Label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: '姓氏是必填',
                pattern: {
                  value: /^[\u4e00-\u9fa5]{1,2}$/,
                  message: '請輸入有效的中文姓氏',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Control {...field} type="text" isInvalid={!!error} />
              )}
            />
            {errors.firstName && (
              <Form.Control.Feedback type="invalid">
                {errors.firstName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label className="text-h5 text-my-black">名</Form.Label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: '名字是必填的',
                pattern: {
                  value: /^[\u4e00-\u9fa5]{1,4}$/,
                  message: '請輸入有效的中文名字',
                },
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  isInvalid={!!errors.lastName}
                />
              )}
            />
            {errors.lastName && (
              <Form.Control.Feedback type="invalid">
                {errors.lastName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-h5 text-my-black">電子郵箱</Form.Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: '電子郵箱是必填項目',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: '無效的電子郵箱地址',
                },
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  isInvalid={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobilePhone">
            <Form.Label className="text-h5 text-my-black">行動電話</Form.Label>
            <Controller
              name="mobilePhone"
              control={control}
              rules={{
                required: '電話是必填',
                pattern: {
                  value: /^09\d{8}$/,
                  message: '請輸入有效的台灣手機號碼',
                },
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  isInvalid={!!errors.mobilePhone}
                />
              )}
            />
            {errors.mobilePhone && (
              <Form.Control.Feedback type="invalid">
                {errors.mobilePhone.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div>
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <MdReceiptLong className="me-2 text-my-black" size="24px" />
              發票類型
            </h2>
            <Form.Group>
              {['1', '2', '3'].map((type, index) => (
                <Controller
                  key={type}
                  name="invoiceType"
                  control={control}
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      className={`text-h5 text-my-black ${styles['form-check']}`}
                      type="radio"
                      label={
                        [
                          '非營業人電子發票',
                          '雲端發票-捐贈',
                          '雲端發票-手機條碼',
                        ][index]
                      }
                      id={`invoiceType${type}`}
                      value={type}
                      checked={field.value === type}
                    />
                  )}
                />
              ))}
            </Form.Group>

            <Collapse in={invoiceType === '3'}>
              <Form.Group className="mb-3">
                <Controller
                  name="mobileBarcode"
                  control={control}
                  rules={{
                    required: invoiceType === '3' ? '請輸入手機載具' : false,
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="請輸入手機載具 ex:/545142S"
                        isInvalid={!!error}
                      />
                      {error && (
                        <Form.Control.Feedback type="invalid">
                          {error.message}
                        </Form.Control.Feedback>
                      )}
                    </>
                  )}
                />
              </Form.Group>
            </Collapse>
          </div>
          <div>
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <MdOutlinePayments className="me-2 text-my-black" size="24px" />
              付款方式
            </h2>
            <Form.Group className="">
              <div className="icon-box d-flex mt-4">
                <Controller
                  name="payType"
                  control={control}
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      className={`text-h5 text-my-black ${styles['form-check']}`}
                      type="radio"
                      label={
                        <div className="icon-box">
                          <img
                            src="/images/paylogo/linepay.png"
                            alt="LINEPAY"
                            className="object-fit-cover ps-3"
                          />
                        </div>
                      }
                      id="payType1"
                      value="LinePay"
                      checked={field.value === 'LinePay'}
                    />
                  )}
                />
              </div>
              <div className="icon-box d-flex mt-4">
                <Controller
                  name="payType"
                  control={control}
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      className={`text-h5 text-my-black ${styles['form-check']}`}
                      type="radio"
                      label={
                        <div className="icon-box">
                          <img
                            src="/images/paylogo/ecpay2.png"
                            alt="ECPAY"
                            className="object-fit-cover ps-3"
                          />
                        </div>
                      }
                      id="payType2"
                      value="EcPay"
                      checked={field.value === 'EcPay'}
                    />
                  )}
                />
              </div>
              <div className="icon-box d-flex mt-4">
                <Controller
                  name="payType"
                  control={control}
                  render={({ field }) => (
                    <Form.Check
                      {...field}
                      className={`text-h5 text-my-black ${styles['form-check']}`}
                      type="radio"
                      label={
                        <div className="icon-box">
                          <img
                            src="/images/paylogo/creditcard.png"
                            alt="Credit Card"
                            className="object-fit-cover ps-2"
                          />
                        </div>
                      }
                      id="payType3"
                      value="信用卡"
                      checked={field.value === 'creditcard'}
                    />
                  )}
                />
              </div>
            </Form.Group>
          </div>
          <div
            onClick={handleSubmit(onSubmit)}
            className="col-lg-4 ms-auto my-button1  mt-5 "
          >
            下一步
          </div>
        </Form>
      </Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'收件資料'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="">
            您有未完成的表單資料，是否要恢復
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleConfirm}>確認</Button>
        </DialogActions>
      </Dialog>
      <style jsx>{`
        .icon-box {
          width: 200px;
          height: 35px;
        }

        .object-fit-cover {
          weight: 100%;
          height: 100%;
          object-fit: cover;
        }
        .back-to-product-list {
          border-bottom: 1px solid var(--my-black);
        }
      `}</style>
    </>
  )
}
