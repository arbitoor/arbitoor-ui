import React, { useEffect } from 'react';
import { providers } from 'near-api-js';
import { getSpinMarkets, InMemoryProvider } from '@arbitoor/arbitoor-core';
import { useWalletSelector } from './WalletSelectorContext';
import { useGlobalStore } from '../utils/globalStore';
import { TokenMetadata } from '../utils/Database';

export function useInMemoryProvider() {
  const { selector } = useWalletSelector();
  const { network } = selector.options;

  const tokenListDB = useGlobalStore((state) => state.tokenListDB);
  
  const [spinData, setSpinData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });

  const tokenMap = tokenListDB.reduce((map, item) => {
    map.set(item.address, item);
    return map;
  }, new Map<string, TokenMetadata>());

  // async function fetchSpinData() {
  //   const spinMarketData = await getSpinMarkets(provider);
  //   const spinData = spinMarketData.filter(
  //     (market: any) =>
  //       market.base.symbol !== 'NEAR' && market.quote.symbol !== 'NEAR'
  //   );
  //   setSpinData(spinData);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   fetchSpinData();
  // }, []);

  const memoizedInMemoryProvider = React.useMemo(() => {
    return new InMemoryProvider(provider, tokenMap);
  }, [tokenMap]);

  return { memoizedInMemoryProvider, isLoading };
}
