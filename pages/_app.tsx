import { AppProps } from 'next/app'
import '../styles/global.css'
import { GlobalcontextProdiver } from '../context/GlobalContext'
import LayoutDashboard from '../layout/LayoutDashboard'
import { withUser } from 'next-firebase-auth'
import initAuth from '../initAuth'

function MyApp({ Component, pageProps }: AppProps) {
  initAuth()

  return (
    <GlobalcontextProdiver>
      {/* <LayoutDashboard> */}
        <Component {...pageProps} />
      {/* </LayoutDashboard> */}
    </GlobalcontextProdiver>
  )
}

export default MyApp