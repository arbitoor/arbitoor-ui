import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { WalletSelectorContextProvider } from '../hooks/WalletSelectorContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletSelectorContextProvider>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </WalletSelectorContextProvider>
  );
}

export default MyApp;
