import React from 'react';
import { Flex, Text, chakra, Box } from '@chakra-ui/react';

interface Props {
  swapSide: string;
  balanceAmount: number;
}

function SwapSide({ swapSide, balanceAmount }: Props) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-end"
      fontSize="0.75rem"
      lineHeight="1rem"
      paddingBottom="14px"
      marginTop="12px"
      color="whitesmoke"
    >
      <Text fontWeight="600" fontSize="0.875rem" lineHeight="1.25rem">
        <chakra.span>You {swapSide}</chakra.span>
      </Text>
      <Box>
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          // color="black"
          fontSize="0.75rem"
          lineHeight="1rem"
          color="whitesmoke"
        >
          <chakra.span>Balance : {balanceAmount}</chakra.span>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SwapSide;
