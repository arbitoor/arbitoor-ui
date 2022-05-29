import React from 'react';
import { Flex } from '@chakra-ui/react';
import TitleContent from './TitleContent';
import SwapBody from './SwapBody';

function Swap() {
  return (
    <Flex direction="column" justifyContent="space-between">
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
