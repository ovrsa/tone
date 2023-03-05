import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RecoilRoot, } from 'recoil';
import { AuthProvider } from '@context/AuthContext';
import Head from "next/head";

const theme = extendTheme({
  colors: {
    // テーマモードが light での背景色を設定
    white: {
      700: "#f8f8f8",
    },
    // テーマモードが dark での背景色を設定
    blackAlpha: {
      700: "#1a202c",
    },
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Tone</title>
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp