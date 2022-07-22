import '../styles/globals.css';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { WalletSelectorContextProvider } from '../hooks/WalletSelectorContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <WalletSelectorContextProvider>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </WalletSelectorContextProvider>
    </>
  );
}

export default MyApp;
