import React, { useEffect } from 'react';
import { providers } from 'near-api-js';
import { getSpinMarkets, InMemoryProvider } from '@arbitoor/arbitoor-core';
import { useWalletSelector } from './WalletSelectorContext';
import { useGlobalStore } from '../utils/globalStore';
import { TokenMetadata } from '../utils/Database';
import { topPools } from '../utils/mockStatsData';

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
  const poolData = async () => {
    await inMemoryProvider.fetchPools();

    let totalRefPools: any = [];
    let totalJumboPools: any = [];
    let totalSpinPools: any = [];
    let totalTonicPools: any = [];

    let refData: any = [];
    let jumboData: any = [];
    let spinData: any = [];
    let tonicData: any = [];

    for (const pool of topPools) {
      const { dex, pool_id, total_amount_in, total_amount_out } = pool;
      if (dex === 'v2.ref-finance.near') {
        const refStablePool = inMemoryProvider.getRefStablePools();
        const refPools = inMemoryProvider.getRefPools();
        totalRefPools = [...refPools, ...refStablePool];

        const value = totalRefPools.filter((data) => {
          return data.id === +pool_id;
        });
        refData.push(...value);
      }
      if (dex === 'v1.jumbo_exchange.near') {
        const jumboPools = inMemoryProvider.getJumboPools();
        const jumboStablePools = inMemoryProvider.getJumboStablePools();
        totalJumboPools = [...jumboPools, ...jumboStablePools];
        const value = totalJumboPools.filter((data) => {
          return data.id === +pool_id;
        });
        jumboData.push(...value);
      }
      if (dex === 'spot.spin-fi.near') {
        const spinPools = inMemoryProvider.getSpinMarkets();
        totalSpinPools = [...spinPools];
        const value = totalSpinPools.filter((data) => {
          return data.id === +pool_id;
        });

        spinData.push(...value);
      }
      if (dex === 'v1.orderbook.near') {
        const tonicPools = inMemoryProvider.getTonicMarkets();
        totalTonicPools = [...tonicPools];
        const value = totalTonicPools.filter((data) => {
          return data.id === pool_id;
        });
        tonicData.push(...value);
      }
    }

    const refTokensData = getTokensAddressFromPoolEndPoint(refData);
    const jumboTokensData = getTokensAddressFromPoolEndPoint(jumboData);
    // const spinTokensData = getTokensAddressFromSpinPool(spinData);
    // const tonicTokensData = getTokensAddressFromPoolEndPoint(tonicData);

    //get token metadata when token address array is passed
    const refTokenMetaData = await getPoolTokensMetaData(refTokensData);
    const jumboTokenMetaData = await getPoolTokensMetaData(jumboTokensData);
    // const spinTokenMetaData = await getPoolTokensMetaData(spinTokensData);
    // const tonicTokenMetaData = await getPoolTokensMetaData(tonicTokensData);

    // console.log({ spinData });
    // console.log({ tonicData });
    // console.log({ jumboTokenMetaData });

    let refResult: any = [];
    // for (const pool of topPools) {
    //   for (const i of refTokenMetaData) {
    //     console.log({ i });
    //   }
    // }
  };
  poolData();
  // tokenIn(ticker)
  //tokenInMetadata
  //tokenOutMetadata
  // tokenOut(ticker)
  // poolId
  // totalVol(tokenIn vol + tokenOut vol)
  // dex

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
