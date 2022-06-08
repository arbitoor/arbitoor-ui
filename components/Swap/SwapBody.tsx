import React from 'react';
import { Box, chakra, Button, Flex } from '@chakra-ui/react';

import SwapContent from './SwapContent';
import PriceDetailsDrawer from '../PriceDetails/PriceDetailsDrawer';
import { useGlobalStore } from '../../utils/globalStore';

function SwapBody() {
  const [show, setShow] = React.useState<boolean>(false);
  const inputAmount = useGlobalStore((state) => state.inputAmount);

  const togglePriceDetailsDrawer = () => {
    setShow(!show);
  };
  return (
    <Flex
      direction="column"
      alignItems="center"
      w="100%"
      maxW="450px"
      paddingBottom="96px"
    >
      <chakra.form>
        <SwapContent />
        <div style={{ marginBottom: '32px' }} />
      </chakra.form>
      {inputAmount ? (
        <Button
          color="whitesmoke"
          _focus={{ border: '1px solid #FF3260' }}
          _hover={{ background: '#de8f1761' }}
          variant="unstyled"
          border="1px solid #FF3260"
          onClick={togglePriceDetailsDrawer}
          p="6px"
        >
          Price Details
        </Button>
      ) : null}

      {show ? <PriceDetailsDrawer /> : null}
    </Flex>
  );
}

export default SwapBody;
