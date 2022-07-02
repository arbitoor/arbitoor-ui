import React, { useEffect } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { providers } from 'near-api-js';
import { InMemoryProvider } from '@arbitoor/arbitoor-core';
import TitleContent from './TitleContent';
import SwapBody from './SwapBody';
import TransactionStatus from '../TransactionStatus/TransactionStatus';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import { useGlobalStore } from '../../utils/globalStore';
import { TokenMetadata } from '../../utils/Database';

function Swap() {
  const { selector } = useWalletSelector();
  const { network } = selector.options;

  const tokenListDB = useGlobalStore((state) => state.tokenListDB);

  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });
  const tokenMap = tokenListDB.reduce((map, item) => {
    map.set(item.address, item);
    return map;
  }, new Map<string, TokenMetadata>());
  const inMemoryProvider = new InMemoryProvider(provider, tokenMap);

  useEffect(() => {
    let timer = setInterval(async () => {
      //TODO: optimize this using service workers
      await inMemoryProvider.fetchPools();
    }, 10000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

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
