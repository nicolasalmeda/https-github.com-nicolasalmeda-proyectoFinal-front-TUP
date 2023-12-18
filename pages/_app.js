import { createGlobalStyle } from 'styled-components';
import {CartContextProvider} from '@/components/CartContext';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #eee;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
      <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
