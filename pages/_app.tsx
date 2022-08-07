import React, { useEffect } from 'react';
import '../styles/globals.css';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import { TokenListProvider, TokenInfo } from '@tonic-foundation/token-list';
import { db } from '../utils/Database';
import { useGlobalStore } from '../utils/globalStore';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { WalletSelectorContextProvider } from '../hooks/WalletSelectorContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [tokenListDB, setTokenListDB] = useGlobalStore((state) => [
    state.tokenListDB,
    state.setTokenListDB,
  ]);
  const [tokenList, setTokenList] = React.useState<TokenInfo[]>([]);
  const [loading, setLoading] = React.useState<boolean>();
  useEffect(() => {
    if (!tokenListDB.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [tokenListDB]);

  useEffect(() => {
    db.tokensMetadata.clear();
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens.filterByNearEnv('mainnet').getList();
      setTokenList(tokenList);
    });
  }, []);

  useEffect(() => {
    addTokens();
    getTokensDataFromDB();
  }, [tokenList]);

  async function getTokensDataFromDB() {
    return await db.tokensMetadata
      .toCollection()
      .toArray()
      .then((data) => setTokenListDB(data));
  }

  async function addTokens() {
    await db.tokensMetadata.bulkPut(tokenList);
  }

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
          {!loading ? (
            <Component {...pageProps} />
          ) : (
            //TODO: MUST add a custom loading spinner
            <Flex justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#F18652"
                size="xl"
              />
            </Flex>
          )}
          <Footer />
        </ChakraProvider>
      </WalletSelectorContextProvider>
    </>
  );
}

export default MyApp;
