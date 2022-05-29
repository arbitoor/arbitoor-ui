import React, { useState, useEffect } from 'react';
import { Flex, Box, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { providers } from 'near-api-js';
import { faSliders, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import TokenList from '../TokenList/TokenList';
import ToggleToken from '../ToggleToken/ToggleToken';
import SwapSide from './SwapSide';
import BestPrice, { RouteInfo } from '../BestPrice/BestPrice';
import CustomButton from '../CustomButton/CustomButton';
import { tokenList } from '../../utils/tokenList';
import { Token } from '../../types';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import {
  Comet,
  EstimateSwapView,
  getExpectedOutputFromActions,
} from 'comet-sdk';
import BigNumber from 'bignumber.js';
import { debounce } from '../../utils/helpers';
import LoadingBestPrice from '../BestPrice/LoadingBestPrice';
import { Transaction } from '@near-wallet-selector/core';

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
  return routes.join(', ').split(' -> ');
}

function SwapContent() {
  const [payToken, setPayToken] = useState<Token>(tokenList[0]);
  const [receiveToken, setReceiveToken] = useState<Token>(tokenList[1]);
  const [inputAmount, setInputAmount] = useState<string>();
  const [paths, setPaths] = useState<RouteInfo[]>();
  const [transactionPayload, setTransactionPayload] = useState<Transaction[]>();
  const [actions, setActions] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  // TODO Remove placeholder routes on the UI. Display generated path once 'routes' is set
  const [routes, setRoutes] = useState<SwapRoute[]>();
  const { selector } = useWalletSelector();

  useEffect(() => {
    fetcherWithDebounce();
  }, [payToken, receiveToken, inputAmount]);

  const fetcherWithDebounce = debounce(() => {
    async function findRoutes() {
      if (inputAmount && payToken && receiveToken && selector) {
        const inputAmountAdjusted = new BigNumber(10)
          .pow(payToken.decimals)
          .multipliedBy(new BigNumber(inputAmount));

        try {
          // const provider = new providers.JsonRpcProvider({
          //   url: 'https://near-mainnet--rpc--archive.datahub.figment.io/apikey/e7051fbb390e25bd106777e8194529c7',
          // });
          const provider = new providers.JsonRpcProvider({
            url: selector.network.nodeUrl,
          });
          const comet = new Comet({
            provider,
            user: localStorage.getItem('accountId')!,
            routeCacheDuration: 1000,
          });

          console.log('generating actions');
          const actions = await comet.computeRoutes({
            inputToken: payToken.id,
            outputToken: receiveToken.id,
            inputAmount: inputAmountAdjusted.toFixed(),
          });
          console.log('actions received');
          setActions(actions);

          // Use this to display swap paths on the UI
          const refPath = getRoutePath(actions.ref);
          const jumboPath = getRoutePath(actions.jumbo);

          const [refOutput, jumboOutput] = await Promise.all([
            getExpectedOutputFromActions(
              provider,
              actions.ref,
              receiveToken.id,
              5
            ),
            getExpectedOutputFromActions(
              provider,
              actions.jumbo,
              receiveToken.id,
              5
            ),
          ]);

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

            setRoutes([
              {
                output: refOutput.toString(),
                actions: actions.ref,
              },
              {
                output: jumboOutput.toString(),
                actions: actions.jumbo,
              },
            ]);
            console.log(
              'ref output',
              refOutput.toString(),
              'jumbo',
              jumboOutput.toString()
            );
            const txs = await comet.nearInstantSwap({
              exchange: 'v2.ref-finance.near',
              tokenIn: payToken.id,
              tokenOut: receiveToken.id,
              tokenInDecimals: payToken.decimals,
              tokenOutDecimals: receiveToken.decimals,
              amountIn: inputAmountAdjusted.toFixed(),
              swapsToDo: actions.ref,
              slippageTolerance: 5,
            });
            console.log({ txs });

            // setRefTransactionPayload(txs);
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
            const txs = await comet.nearInstantSwap({
              exchange: 'v1.jumbo_exchange.near',
              tokenIn: payToken.id,
              tokenOut: receiveToken.id,
              tokenInDecimals: payToken.decimals,
              tokenOutDecimals: receiveToken.decimals,
              amountIn: inputAmountAdjusted.toFixed(),
              swapsToDo: actions.ref,
              slippageTolerance: 5,
            });

            // setJumboTransactionPayload(txs);
            setTransactionPayload(txs);
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    }
    findRoutes();
  }, 2000);

  // useEffect(() => {
  //   fetcherWithDebounce();
  // }, [inputAmount]);

  const handleSignIn = () => {
    selector.show();
  };

  function selectPayToken(token: Token) {
    setPayToken(token);
  }
  function selectReceiveToken(token: Token) {
    setReceiveToken(token);
  }
  function tokenSwitchHandler() {
    setPayToken(receiveToken);
    setReceiveToken(payToken);
  }

  async function handleSwap() {
    console.log('tokens', payToken, receiveToken);

    if (transactionPayload) {
      await selector.signAndSendTransactions({
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
        <Flex marginBottom="16px" justifyContent="flex-end" alignItems="center">
          <Box paddingRight="18px">
            <FontAwesomeIcon
              icon={faRotateRight}
              color="whitesmoke"
              height="18px"
              width="18px"
              cursor="pointer"
            />
          </Box>
          <Box>
            <FontAwesomeIcon
              icon={faSliders}
              color="whitesmoke"
              height="18px"
              width="18px"
              cursor="pointer"
            />
          </Box>
        </Flex>
        <SwapSide swapSide="pay" balanceAmount={10} />
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
              onChange={(event) => {
                setInputAmount(event.target.value);
              }}
            />
          </Flex>
        </Box>

        <ToggleToken handleTokenSwitch={tokenSwitchHandler} />
        <Box>
          <SwapSide swapSide="receive" balanceAmount={1} />

          <TokenList selectToken={selectReceiveToken} token={receiveToken} />
          {loading || !paths?.length ? (
            <LoadingBestPrice
              text={
                inputAmount
                  ? 'Please wait while we fetch the best price...'
                  : ''
              }
              display={!inputAmount ? 'none' : 'flex'}
            />
          ) : (
            paths.length === 2 && (
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
        isSignedIn={selector.isSignedIn()}
        swapHandler={selector.isSignedIn() ? handleSwap : handleSignIn}
        disabled={selector.isSignedIn() && !paths?.length}
      />
    </>
  );
}

export default SwapContent;
