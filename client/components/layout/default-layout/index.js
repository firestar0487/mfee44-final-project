import Head from 'next/head'

import Header from '@/components/layout/default-layout/myHeader/header'
import Footer from '@/components/layout/default-layout/myFooter/footer'

import NextBreadCrumb from '@/components/common/next-breadcrumb'

import ToasterProvider from '@/components/common/toasterProvider'

import ScrollToTopButton from '@/components/myProduct/upbutton'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />

      <main className="flex-shrink-0 mt-3">
        <ToasterProvider />
        <div className="container">
          {/* 麵包屑 還在考慮要不要用 */}
          <NextBreadCrumb isHomeIcon isChevron bgClass="" />
          {children}
     
        </div>
        <ScrollToTopButton/>
      </main>
     
      <Footer />
    </>
  )
}
