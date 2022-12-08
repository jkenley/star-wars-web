import '@styles/global.css'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@theme/theme'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme} resetCSS>
       <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
