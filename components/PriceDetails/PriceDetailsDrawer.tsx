import React from 'react';
import { Box, chakra, Button, Flex, Text } from '@chakra-ui/react';
import { useGlobalStore } from '../../utils/globalStore';
import { percentToNumber } from '../../utils/helpers';

function PriceDetailsDrawer() {
  const paths = useGlobalStore((state) => state.paths);
  const slippageValue = useGlobalStore((state) => state.slippageValue);

  const minReceivedAmount = +paths[0]?.output - percentToNumber(slippageValue);

  return (
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
              ? minReceivedAmount.toFixed(4)
              : '--'
            : '--'}
        </Text>
        <Box display="grid" gridTemplateColumns="0.5fr 0.5fr 2fr">
          <Text flex="1 0 0%">Routes :</Text>
          <Flex direction="column" alignItems="center">
            {paths.length
              ? paths[0].routePercentage?.map((pecent: string, idx: number) => {
                  return <Text key={idx}>{pecent}%</Text>;
                })
              : '--'}
          </Flex>
          <Flex direction="row">
            <Box flex={['1 0 45%', '1 0 55%', '1 0 65%', '1 0 65%']}>
              {paths.length
                ? paths[0].path?.map((ticker: string, idx: number) => {
                    return <Text key={idx}>{ticker}</Text>;
                  })
                : '--'}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default PriceDetailsDrawer;
