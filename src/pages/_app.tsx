import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RecoilRoot, } from 'recoil';
import { AuthProvider } from '@context/AuthContext';
import { mode } from "@chakra-ui/theme-tools";
import Head from "next/head";
import React from 'react';

const theme = extendTheme({
  styles: {
    global: (props: React.FC) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
      },
    }),
  },
  colors: {
    brand: {
      50: "#ffe6e6",
      100: "#ffc2c2",
      // ...
      900: "#7f0000",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "Menlo, monospace",
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