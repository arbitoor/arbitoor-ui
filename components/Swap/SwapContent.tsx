import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Box, Input, Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { providers } from 'near-api-js';
import TokenList from '../TokenList/TokenList';
import ToggleToken from '../ToggleToken/ToggleToken';
import SwapSide from './SwapSide';
import BestPrice, { RouteInfo } from '../BestPrice/BestPrice';
import CustomButton from '../CustomButton/CustomButton';
// import { tokenList } from '../../utils/tokenList';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import {
  Arbitoor,
  getRoutePath,
  RouteInfo as PathInfo,
  toPrecision,
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
import { useInMemoryProvider } from '../../hooks/useInMemoryProvider';
import { getBalance } from '../../utils/helpers';

/**
 * Returns a string representation of swap path
 *
 * Example: USDC -> USDT, USDC -> WNEAR, USDT
 * @param actions
 * @returns
 */

function normalizeRoutesPath(actions: any, tokenList: TokenMetadata[]) {
  const routes: string[] = [];
  actions.forEach((action: any) => {
    const route = action.tokens
      .map((token: any) => {
        const [saved] = tokenList.filter((savedToken) => {
          return savedToken.address == token;
        });

        // return saved ? saved.logoURI : token.slice(0, 10);
        return saved ? saved.logoURI : '/assets/icons/cross.png';
      })
      .join(' --> ');
    if (routes[routes.length - 1] !== route) {
      routes.push(route);
    }
  });
  return routes;
}

function SwapContent() {
  const tokenListDB = useGlobalStore((state) => state.tokenListDB);

  const [payToken, setPayToken] = useState<TokenMetadata>(tokenListDB[47]);
  const [receiveToken, setReceiveToken] = useState<TokenMetadata>(
    tokenListDB[46]
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

  const [txHash, setTxHash] = useGlobalStore((state) => [
    state.txHash,
    state.setTxHash,
  ]);

  const slippageValue = useGlobalStore((state) => state.slippageValue);

  const [transactionPayload, setTransactionPayload] = useState<Transaction[]>(
    []
  );
  const [actions, setActions] = useState<PathInfo[]>();
  const [loading, setLoading] = useState<boolean>();
  const [globalLoader, setGlobalLoader] = useState<boolean>();
  const [inputError, setInputError] = useState<string>('');
  const [inputAmountAdjusted, setInputAmountAdjusted] = useState<string>('');

  const storageAccount = localStorage.getItem('accountId');

  const { selector, modal, authKey, accountId, walletType } =
    useWalletSelector();
  const senderInstalled =
    typeof window.near !== 'undefined' && window.near.isSender;
  const { memoizedInMemoryProvider, isLoading } = useInMemoryProvider();

  const isSignedIn = selector.isSignedIn();
  const { network } = selector.options;
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });

  const arbitoor = new Arbitoor({
    accountProvider: memoizedInMemoryProvider,
    user: localStorage.getItem('accountId')!,
  });

  useEffect(() => {
    if (+inputAmount > 0) {
      memoizedFetcher(inputAmount);
    }
  }, [payToken, receiveToken, inputAmount]);

  const memoizedFetcher = useCallback(
    (input: string) => {
      fetcherWithDebounce(input);
      setPaths([]);
    },
    [payToken, receiveToken, isLoading]
  );

  const fetcherWithDebounce = _.debounce(findRoutes, 1000);

  useEffect(() => {
    if (authKey?.accountId || accountId) {
      getTokenBalance();
    }

    setUserPayTokenBalance('0.0000');
    setUserReceiveTokenBalance('0.0000');
  }, [payToken, receiveToken, authKey, accountId, txHash]);

  async function getTokenBalance() {
    //TODO: to make a generic function to fetch balances
    try {
      const getPaytokenBalance = await getBalance(
        payToken?.address,
        authKey?.accountId || accountId,
        provider
      );
      if (payToken) {
        const resultPay = (
          getPaytokenBalance * Math.pow(10, -payToken?.decimals)
        ).toString();
        setUserPayTokenBalance(toPrecision(resultPay, 4));
      }

      const getReceivetokenBalance = await getBalance(
        receiveToken?.address,
        authKey?.accountId || accountId,
        provider
      );
      if (receiveToken) {
        const resultReceive = (
          getReceivetokenBalance * Math.pow(10, -receiveToken?.decimals)
        ).toString();
        setUserReceiveTokenBalance(toPrecision(resultReceive, 4));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function findRoutes(input: string) {
    if (input && payToken && receiveToken && selector) {
      const inputAmountAdjusted = new BigNumber(10)
        .pow(payToken.decimals)
        .multipliedBy(new BigNumber(input));
      setInputAmountAdjusted(inputAmountAdjusted.toFixed());

      try {
        await memoizedInMemoryProvider.fetchPools();

        console.log('generating actions');
        const actions = await arbitoor.computeRoutes({
          inputToken: payToken.address,
          outputToken: receiveToken.address,
          inputAmount: inputAmountAdjusted.toFixed(),
        });
        setActions(actions);

        console.log('actions', actions);

        let pathList: RouteInfo[] = [];

        for (const action of actions) {
          console.log('dex', action.dex, 'output', action.output.toString());

          const generatePath = getRoutePath(action);
          const path = normalizeRoutesPath(generatePath, tokenListDB);

          const output = toPrecision(action?.output.toString(), 4);
          const dex = action?.dex;
          const routePercentage = generatePath.map((data) => data?.percentage);

          pathList.push({ path, output, dex, routePercentage });
        }
        setPaths(pathList);

        // setLoading(false);
      } catch (error) {
        console.error(error);
        // setLoading(false);
      }
    }
  }

  const handleSignIn = () => {
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
    const { value } = evt.target;
    if (value < 0) {
      return;
    }
    setInputAmount(value);
  }

  useEffect(() => {
    if (inputError) {
      setInputError('');
    }
    if (+userPayTokenBalance < +inputAmount) {
      setInputError('Insufficient funds to make this transaction');
    }
  }, [inputAmount, userPayTokenBalance]);

  function handleHalfValue() {
    if (userPayTokenBalance && +userPayTokenBalance > 0) {
      setInputAmount((+userPayTokenBalance / 2).toString());
    }
  }
  function handleMaxValue() {
    if (userPayTokenBalance && +userPayTokenBalance > 0) {
      setInputAmount(userPayTokenBalance);
    }
  }

  async function handleSwap() {
    console.log('tokens', payToken, receiveToken);

    if (receiveToken && (storageAccount || accountId)) {
      const storage = memoizedInMemoryProvider.ftGetStorageBalance(
        receiveToken.address,
        storageAccount || accountId!
      );
      if (!storage) {
        await memoizedInMemoryProvider.ftFetchStorageBalance(
          receiveToken.address,
          storageAccount || accountId!
        );
      }
    }
    try {
      setLoading(true);

      if (actions && actions[0]) {
        const txs = await arbitoor.generateTransactions({
          routeInfo: actions[0],
          slippageTolerance: slippageValue,
        });

        const transactions = JSON.parse(JSON.stringify(txs));
        const wallet = await selector.wallet();
        const tx = await wallet.signAndSendTransactions({
          transactions,
        });
        if (tx) {
          setTxHash(tx[tx.length - 1]?.transaction_outcome?.id);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (globalLoader) {
    return (
      <Flex justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#F18652"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <>
      <Flex
        direction="column"
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
              <SpinningRefresh
                fetchRoutes={() => {
                  if (inputAmount) memoizedFetcher(inputAmount);
                }}
              />
            </Box>
            <Box>
              <SlippageSettings />
            </Box>
          </Flex>
        </Flex>
        <SwapSide
          swapSide="pay"
          balanceAmount={userPayTokenBalance}
          halfValueHandler={handleHalfValue}
          maxValueHandler={handleMaxValue}
        />

        <Box
          paddingX="14px"
          backgroundColor="#101010"
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
          {loading || !paths?.length || +inputAmount <= 0 ? (
            <LoadingBestPrice display={+inputAmount <= 0 ? 'none' : 'flex'} />
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
        btnType={
          (isSignedIn || authKey?.accountId) && inputError.length
            ? 'error'
            : 'swap'
        }
        text="Connect Wallet"
        isSignedIn={authKey?.accountId || isSignedIn}
        swapHandler={
          authKey?.accountId || isSignedIn ? handleSwap : handleSignIn
        }
        disabled={
          (authKey?.accountId || isSignedIn) &&
          (!paths[0]?.path?.length ||
            +inputAmount <= 0 ||
            inputError.length ||
            loading)
        }
        isLoading={loading}
      />
    </>
  );
}

export default SwapContent;
