import { useEffect } from 'react'
//樣式
import '@/styles/globals.scss'
import '@/styles/cart.scss'

//後續載入context

//購物車專用的Provider
import { CartProvider } from '@/hooks/user-cart'

//表單用的Provider
import { CheckoutProvider } from '@/hooks/use-checkout'
//庫存用的Provider
import { StoreProvider } from '@/hooks/store-context'

import DefaultLayout from '@/components/layout/default-layout'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <CartProvider>
      <CheckoutProvider>
        <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>
      </CheckoutProvider>
    </CartProvider>
  )
}
