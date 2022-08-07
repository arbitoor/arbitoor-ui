import React from 'react';
import { Box, chakra, Button, Flex, Text, Image } from '@chakra-ui/react';
import { useGlobalStore } from '../../utils/globalStore';
import { percentToNumber } from '../../utils/helpers';
import { toPrecision } from '@arbitoor/arbitoor-core';
// import Image from 'next/image';

function PriceDetailsDrawer() {
  const paths = useGlobalStore((state) => state.paths);
  const slippageValue = useGlobalStore((state) => state.slippageValue);

  const minReceivedAmount = +paths[0]?.output - percentToNumber(slippageValue);

  function renderRouteArrow(idx) {
    if (idx !== 1) {
      return (
        <Image
          alt="rightarrow"
          src={'/assets/icons/arrowRight.svg'}
          width="50px"
          height={5}
          borderRadius="12px"
          fill={'white'}
        />
      );
    }

    return null;
  }

  function renderRoute(routeStr) {
    const routeArr = routeStr.split(' --> ');

    return (
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}
      >
        {routeArr.map((route, key) => {
          return (
            <>
              {renderRouteArrow(key + 1)}
              <Image
                key={key}
                alt="tickLogo"
                src={route || '/assets/icons/cross.png'}
                width="24px"
                height="24px"
                borderRadius="12px"
              />
            </>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {paths && paths[0]?.path?.length ? (
        <Flex
          direction="column"
          color="whitesmoke"
          width="100%"
          bg="#26262C"
          height="148px"
          borderRadius="12px"
          mt="4"
        >
          <Flex
            border="1px solid"
            borderColor=" #FF3260"
            borderRadius="12px"
            height="100%"
            m="12px"
            p="12px"
            lineHeight="1.75"
            direction="column"
            fontSize="14px"
            letterSpacing="0.5px"
          >
            {/* <Text>Slippage tolerance : 0.5 %</Text> */}

            <Text>
              Minimum Received :{' '}
              {paths.length
                ? minReceivedAmount > 0
                  ? toPrecision(minReceivedAmount.toString(), 4)
                  : '--'
                : '--'}
            </Text>
            <Box display="grid" gridTemplateColumns="0.5fr 0.5fr 2fr">
              <Text flex="1 0 0%">Routes :</Text>
              <Flex direction="column" alignItems="center">
                {paths.length
                  ? paths[0].routePercentage?.map(
                      (pecent: string, idx: number) => {
                        return (
                          <Text key={idx} marginBottom="6px">
                            {pecent}%
                          </Text>
                        );
                      }
                    )
                  : '--'}
              </Flex>
              <Flex direction="row">
                <Box flex={['1 0 45%', '1 0 55%', '1 0 65%', '1 0 65%']}>
                  {paths.length
                    ? paths[0].path?.map((ticker: string, idx: number) => {
                        return (
                          <div key={idx} style={{ display: 'flex' }}>
                            {renderRoute(ticker)}
                            {/* <Text key={idx}>{ticker}</Text>; */}
                          </div>
                        );
                      })
                    : '--'}
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      ) : null}
    </>
  );
}

export default PriceDetailsDrawer;
