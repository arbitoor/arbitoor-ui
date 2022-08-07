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

  const inMemoryProvider = new InMemoryProvider(provider, tokenMap);

  function getTokensAddressFromPoolEndPoint(dexPoolData) {
    let tokenAddresses: any = [];
    for (const tokenData of dexPoolData) {
      const { token_account_ids } = tokenData;
      tokenAddresses.push(token_account_ids);
    }
    return tokenAddresses;
  }
  // function getTokensAddressFromSpinPool(spinPoolData) {
  //   let tokenAddresses: any = [];
  //   for (const tokenData of spinPoolData) {
  //     const { base, quote } = tokenData;
  //     tokenAddresses.push(base.address, quote.address);
  //   }
  //   console.log({ tokenAddresses });
  //   // return tokenAddresses;
  // }
  // function getTokensAddressFromTonicPool(tonicPoolData) {
  //   let tokenAddresses: any = [];
  //   for (const tokenData of tonicPoolData) {
  //     // const { token_account_ids } = tokenData;
  //     // tokenAddresses.push(token_account_ids);
  //   }
  //   // return tokenAddresses;
  // }
  async function getPoolTokensMetaData(poolTokensAddressesArray) {
    let poolTokenMetaData: any = [];
    for (const metaData of poolTokensAddressesArray) {
      const tokenMetaData = await getTokenMetaDataFromNetwork(metaData);
      poolTokenMetaData.push(tokenMetaData);
    }
    return poolTokenMetaData;
  }

  async function getTokenMetaDataFromNetwork(tokensArray: string[]) {
    let data: any = [];
    for (const token of tokensArray) {
      const metaData = await inMemoryProvider.getTokenMetadata(token);
      data.push(metaData);
    }
    return data;
  }

  const memoizedInMemoryProvider = React.useMemo(() => {
    return new InMemoryProvider(provider, tokenMap);
  }, [tokenMap]);

  return { memoizedInMemoryProvider, isLoading };
}
