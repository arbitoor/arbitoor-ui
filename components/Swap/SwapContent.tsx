import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Box, Input, Text } from '@chakra-ui/react';
import { providers } from 'near-api-js';
import TokenList from '../TokenList/TokenList';
import ToggleToken from '../ToggleToken/ToggleToken';
import SwapSide from './SwapSide';
import BestPrice, { RouteInfo } from '../BestPrice/BestPrice';
import CustomButton from '../CustomButton/CustomButton';
import { tokenList } from '../../utils/tokenList';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import {
  Comet,
  EstimateSwapView,
  InMemoryProvider,
} from '@arbitoor/arbitoor-core';
import BigNumber from 'bignumber.js';
import _ from 'lodash';
import LoadingBestPrice from '../BestPrice/LoadingBestPrice';
import { Transaction } from '@near-wallet-selector/core';
import type { CodeResult } from 'near-api-js/lib/providers/provider';
import SpinningRefresh from '../SpinningRefresh/SpinningRefresh';
import SlippageSettings from '../SlippageSettings/SlippageSettings';
import { useGlobalStore } from '../../utils/globalStore';
import { TokenMetadata } from '../../utils/Database';
export interface SwapRoute {
  output: string;
  actions: EstimateSwapView[];
}

/**
 * Returns a string representation of swap path
 *
 * Example: USDC -> USDT, USDC -> WNEAR, USDT
 * @param actions
 * @returns
 */
function getRoutePath(actions: EstimateSwapView[]) {
  const routes: string[] = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const route = action
      .nodeRoute!.map((token) => {
        const saved = tokenList.find((savedToken) => {
          return savedToken.id == token;
        });

        return saved ? saved.ticker : token.slice(0, 10);
      })
      .join(' -> ');

    if (i === 0 || routes[routes.length - 1] !== route) {
      routes.push(route);
    }
  }

  // return routes.join(', ').split(' -> ');
  return routes;
}

function SwapContent() {
  const tokenListDB = useGlobalStore((state) => state.tokenListDB);

  const [payToken, setPayToken] = useState<TokenMetadata>(tokenListDB[46]);
  const [receiveToken, setReceiveToken] = useState<TokenMetadata>(
    tokenListDB[14]
  );
  const [userPayTokenBalance, setUserPayTokenBalance] =
    useState<string>('0.0000');
  const [userReceiveTokenBalance, setUserReceiveTokenBalance] =
    useState<string>('0.0000');

  const [inputAmount, setInputAmount] = useGlobalStore((state) => [
    state.inputAmount,
    state.setInputAmount,
  ]);
  const [paths, setPaths] = useGlobalStore((state) => [
    state.paths,
    state.setPaths,
  ]);

  const [transactionPayload, setTransactionPayload] = useState<Transaction[]>();
  const [actions, setActions] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { selector, modal, authKey, accountId } = useWalletSelector();

  const { network } = selector.options;
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });
  const inMemoryProvider = new InMemoryProvider(provider);

  const tokenMap = tokenListDB.reduce((map, item) => {
    map.set(item.address, item);
    return map;
  }, new Map<string, TokenMetadata>());

  const comet = new Comet({
    provider,
    accountProvider: inMemoryProvider,
    tokenMap,
    user: localStorage.getItem('accountId')!,
    routeCacheDuration: 1000,
  });

  useEffect(() => {
    if (inputAmount !== '') {
      memoizedFetcher(inputAmount);
    }
  }, [payToken, receiveToken, inputAmount]);

  const memoizedFetcher = useCallback(
    (input: string) => {
      fetcherWithDebounce(input);
      setPaths([]);
    },
    [payToken, receiveToken]
  );

  const fetcherWithDebounce = _.debounce(findRoutes, 1000);

  useEffect(() => {
    if (authKey?.accountId) {
      getTokenBalance();
    }

    setUserPayTokenBalance('0.0000');
    setUserReceiveTokenBalance('0.0000');
  }, [payToken, receiveToken, authKey]);

  useEffect(() => {
    getPoolData();
  }, [payToken, receiveToken]);

  async function getTokenBalance() {
    try {
      const getPaytokenBalance = await provider.query<CodeResult>({
        request_type: 'call_function',
        account_id: payToken?.address,
        method_name: 'ft_balance_of',
        args_base64: Buffer.from(
          JSON.stringify({ account_id: authKey?.accountId })
        ).toString('base64'),
        finality: 'optimistic',
      });
      const userPayTokenBalance = JSON.parse(
        Buffer.from(getPaytokenBalance.result).toString()
      );
      if (payToken) {
        const resultPay = (
          userPayTokenBalance * Math.pow(10, -payToken?.decimals)
        ).toFixed(4);
        setUserPayTokenBalance(resultPay);
      }

      const getReceivetokenBalance = await provider.query<CodeResult>({
        request_type: 'call_function',
        account_id: receiveToken?.address,
        method_name: 'ft_balance_of',
        args_base64: Buffer.from(
          JSON.stringify({ account_id: authKey?.accountId })
        ).toString('base64'),
        finality: 'optimistic',
      });
      const userReceiveTokenBalance = JSON.parse(
        Buffer.from(getReceivetokenBalance.result).toString()
      );
      if (receiveToken) {
        const resultReceive = (
          userReceiveTokenBalance * Math.pow(10, -receiveToken?.decimals)
        ).toFixed(4);
        setUserReceiveTokenBalance(resultReceive);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPoolData() {
    if (receiveToken) {
      await inMemoryProvider.ftFetchStorageBalance(
        receiveToken.address,
        localStorage.getItem('accountId')!
      );
    }
    await inMemoryProvider.fetchPools();
  }

  async function findRoutes(input: string) {
    if (input && payToken && receiveToken && selector) {
      const inputAmountAdjusted = new BigNumber(10)
        .pow(payToken.decimals)
        .multipliedBy(new BigNumber(input));
      try {
        // const provider = new providers.JsonRpcProvider({
        //   url: 'https://near-mainnet--rpc--archive.datahub.figment.io/apikey/e7051fbb390e25bd106777e8194529c7',
        // });
        console.log('generating actions');
        const actions = await comet.computeRoutes({
          inputToken: payToken!.address,
          outputToken: receiveToken!.address,
          inputAmount: inputAmountAdjusted.toFixed(),
          slippageTolerance: 0.5,
        });
        console.log('actions', actions);
        setActions(actions);
        // Use this to display swap paths on the UI
        const refPath = getRoutePath(actions[0].actions);
        const jumboPath = getRoutePath(actions[1].actions);
        const refOutput = actions[0].output;
        const jumboOutput = actions[1].output;
        if (refOutput.gte(jumboOutput)) {
          setPaths([
            {
              path: refPath,
              output: refOutput.toFixed(3),
            },
            {
              path: jumboPath,
              output: jumboOutput.toFixed(3),
            },
          ]);
          console.log(
            'ref output',
            refOutput.toString(),
            'jumbo',
            jumboOutput.toString()
          );
          const txs = actions[0].txs;
          console.log({ txs });
          setTransactionPayload(txs);
        } else {
          setPaths([
            {
              path: jumboPath,
              output: jumboOutput.toFixed(3),
            },
            {
              path: refPath,
              output: refOutput.toFixed(3),
            },
          ]);
          const txs = actions[1].txs;
          setTransactionPayload(txs);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }

  const handleSignIn = () => {
    // selector.show();
    modal.show();
  };

  function selectPayToken(token: TokenMetadata) {
    setPayToken(token);
  }
  function selectReceiveToken(token: TokenMetadata) {
    setReceiveToken(token);
  }
  function tokenSwitchHandler() {
    setPayToken(receiveToken);
    setReceiveToken(payToken);
  }

  function handleInputChange(evt: any) {
    setInputAmount(evt.target.value);
  }
  async function handleSwap() {
    console.log('tokens', payToken, receiveToken);

    const wallet = await selector.wallet();
    if (transactionPayload) {
      console.log({ transactionPayload });
      await wallet.signAndSendTransactions({
        transactions: transactionPayload,
      });
    }

    // if (refOutput.gte(jumboOutput)) {
    //   await selector.signAndSendTransactions({
    //     transactions: refTransactionPayload,
    //   });
    // } else {
    //   await selector.signAndSendTransactions({
    //     transactions: jumboTransactionPayload,
    //   });
    // }
  }
  return (
    <>
      <Flex
        direction="column"
        // bgColor="whitesmoke"
        bgColor="#26262C"
        borderRadius="14px"
        padding="22px 22px 32px"
        color="whitesmoke"
      >
        <Flex justifyContent="space-between">
          <Text fontSize="22px">Swap</Text>
          <Flex
            marginBottom="16px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box>
              <SpinningRefresh />
            </Box>
            <Box>
              <SlippageSettings />
            </Box>
          </Flex>
        </Flex>
        <SwapSide swapSide="pay" balanceAmount={userPayTokenBalance} />
        <Box
          paddingX="14px"
          backgroundColor="#101010"
          // backgroundColor="white"
          height="64px"
          borderRadius="14px"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            paddingY="14px"
          >
            <TokenList selectToken={selectPayToken} token={payToken} />

            <Input
              fontWeight="600"
              fontSize="1.125rem"
              variant="unstyled"
              textAlign="right"
              placeholder="0.00"
              type="number"
              value={inputAmount}
              onChange={handleInputChange}
              width={['50%', '50%', '75%', '75%']}
            />
          </Flex>
        </Box>

        <ToggleToken handleTokenSwitch={tokenSwitchHandler} />
        <Box>
          <SwapSide
            swapSide="receive"
            balanceAmount={userReceiveTokenBalance}
          />

          <TokenList selectToken={selectReceiveToken} token={receiveToken} />
          {loading || !paths?.length || !inputAmount ? (
            <LoadingBestPrice
              text={
                inputAmount
                  ? 'Please wait while we fetch the best price...'
                  : ''
              }
              display={!inputAmount.length ? 'none' : 'flex'}
            />
          ) : (
            paths.length && (
              <BestPrice routes={paths as [RouteInfo, RouteInfo]} />
            )
          )}
        </Box>
      </Flex>

      <div
        style={{
          marginBottom: '18px',
        }}
      />
      <CustomButton
        btnType="swap"
        text="Connect Wallet"
        isSignedIn={authKey?.accountId}
        swapHandler={authKey?.accountId ? handleSwap : handleSignIn}
        disabled={authKey?.accountId && !paths?.length}
        // isSignedIn={selector.isSignedIn()}
        // swapHandler={selector.isSignedIn() ? handleSwap : handleSignIn}
        // disabled={selector.isSignedIn() && !paths?.length}
      />
    </>
  );
}

export default SwapContent;
