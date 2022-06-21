import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import TitleContent from './TitleContent';
import SwapBody from './SwapBody';
import TransactionStatus from '../TransactionStatus/TransactionStatus';

function Swap() {
  return (
    <Flex direction="column" justifyContent="space-between">
      <TransactionStatus />

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        marginTop="40px"
      >
        {/* <TitleContent /> */}
        <SwapBody />
      </Flex>
    </Flex>
  );
}

export default Swap;
