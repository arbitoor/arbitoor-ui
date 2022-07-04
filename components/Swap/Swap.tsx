import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
// import TitleContent from './TitleContent';
import SwapBody from './SwapBody';
import TransactionStatus from '../TransactionStatus/TransactionStatus';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import { useGlobalStore } from '../../utils/globalStore';
import { TokenMetadata } from '../../utils/Database';

import { useInMemoryProvider } from '../../hooks/useInMemoryProvider';

function Swap() {
  const { memoizedInMemoryProvider, isLoading } = useInMemoryProvider();

  useEffect(() => {
    let timer: any;
    if (!isLoading) {
      timer = setInterval(async () => {
        //TODO: optimize this using service workers
        await memoizedInMemoryProvider.fetchPools();
      }, 10000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading]);

  return (
    <Flex direction="column" justifyContent="space-between">
      <TransactionStatus />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        marginTop="40px"
      >
        {/* <TitleContent /> */}
        <SwapBody />
      </Flex>
    </Flex>
  );
}

export default Swap;
