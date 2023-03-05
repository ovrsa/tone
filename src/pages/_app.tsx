import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot, } from 'recoil';
import { AuthProvider } from '@context/AuthContext';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider>
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