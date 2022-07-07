import React from 'react';
import { Flex, Text, chakra, Box, Button } from '@chakra-ui/react';

interface Props {
  swapSide: string;
  balanceAmount: string;
  maxValueHandler?: () => void;
  halfValueHandler?: () => void;
}

function SwapSide({
  swapSide,
  balanceAmount,
  maxValueHandler,
  halfValueHandler,
}: Props) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-end"
      fontSize="0.75rem"
      lineHeight="1rem"
      paddingBottom="14px"
      marginTop="12px"
      color="whitesmoke"
      wrap="wrap"
    >
      <Text fontWeight="600" fontSize="0.875rem" lineHeight="1.25rem">
        <chakra.span>You {swapSide}</chakra.span>
      </Text>
      <Flex>
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
        {swapSide === 'pay' ? (
          <Flex marginLeft="6px">
            <Button
              variant="link"
              _focus={{ border: 'none' }}
              color="#d09a4b"
              fontSize="0.75rem"
              minWidth="2rem"
              onClick={halfValueHandler}
            >
              Half
            </Button>
            <Button
              variant="link"
              _focus={{ border: 'none' }}
              color="#d09a4b"
              fontSize="0.75rem"
              minWidth="2rem"
              onClick={maxValueHandler}
            >
              Max
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default SwapSide;
