import { createContext, useState, useContext, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

//1.建立與導出
export const CartContext = createContext(null)
// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
export function CartProvider({ children }) {
  // 共享用狀態(state)
  const [cart, setCart] = useState([])

  //初始化 localstorage資料提取到cart
  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const clientCart = JSON.parse(localStorage.getItem('cart'))
      setCart(clientCart)
    }
  }, [])

  //cart狀態改變 同步更新到localstorage的cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // general datas
  const cartGeneral = cart.filter((v) => v.type === 'general')

  // course datas
  const cartCourse = cart.filter((v) => v.type === 'course')

  //購物車的某item數量增加
  const increment = (id) => {
    const newCart = cart.map((v) => {
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      else return v
    })
    setCart(newCart)
  }

  //購物車的某item數量減少
  const decrement = (id) => {
    const newCart = cart.map((v) => {
      if (v.id === id) return { ...v, qty: v.qty - 1 }
      else return v
    })
    setCart(newCart)
  }

  // 新增項目到購物車 (old version)
  const addCartItem = (item) => {
    if (item.type === 'general') {
      const index = cart.findIndex((v) => v.id === item.id)
      if (index > -1) {
        increment(item.id)
        toast.success(`添加【${item.name}】到購物車成功`)
        return false
      }
      // 擴充item數量屬性
      const newItem = { ...item, qty: 1 }
      const newCart = [...cart, newItem]
      toast.success(`添加【${item.name}】到購物車成功`)
      setCart(newCart)
    } else {
      // 只有單一數量的商品 例如課程
      const index = cart.findIndex((v) => v.id === item.id)
      if (index > -1) {
        // alert(`已經添加過【${item.name}】到購物車`)
        toast.error(`已經添加過【${item.name}】到購物車`)
        return false
      }
      // 擴充item數量屬性
      const newItem = { ...item, qty: 1 }
      const newCart = [...cart, newItem]
      setCart(newCart)
      toast.success(`添加【${item.name}】到購物車成功`)
    }
  }

  //刪除購物車的項目
  const removeCartItem = (item) => {
    const newCart = cart.filter((v) => v.id !== item.id)
    setCart(newCart)
  }

  //計算總商品數量 以品項計算
  const totalItems = cart.length

  // 轉換金額格式為$99,999
  function formatPrice(price) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    })
    return formatter.format(price)
  }

  return (
    <CartContext.Provider
      value={{
        // 購物車
        cart,
        removeCartItem,
        increment,
        decrement,
        addCartItem,
        formatPrice,
        cartCourse,
        cartGeneral,
        totalItems,
        // Toast
        Toaster,
      }}
      //用value屬性傳入共享用狀態(state)
    >
      {children}
    </CartContext.Provider>
  )
}
// 給消費者們(consumers)，包裝好專用於此context的勾子名稱
export const useCart = () => useContext(CartContext)
