import React from 'react';
import { Box, chakra, Button, Flex, Text } from '@chakra-ui/react';
import { useGlobalStore } from '../../utils/globalStore';

function PriceDetailsDrawer() {
  const paths = useGlobalStore((state) => state.paths);

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
        <Text>Price Impact : --</Text>
        <Box>
          <Flex direction="row">
            <Text flex="1 0 0%">Routes :</Text>
            <Box flex="1 0 65%">
              {paths.length
                ? paths[0].path.map((ticker: string, idx: number) => {
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
