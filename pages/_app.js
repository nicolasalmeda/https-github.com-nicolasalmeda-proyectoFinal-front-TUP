import { createGlobalStyle } from 'styled-components';
import {CartContextProvider} from '@/components/CartContext';
import { SessionProvider } from "next-auth/react"

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #eee;
    min-height: 100vh;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={pageProps.session}>
      <CartContextProvider>
      <Component {...pageProps} />
      </CartContextProvider>
      </SessionProvider>
    </>
  )
}
