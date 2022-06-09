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
          _focus={{ border: 'none' }}
          _hover={{ background: '#de8f1761' }}
          variant="unstyled"
          onClick={togglePriceDetailsDrawer}
          bg="#26262C"
          p="6px 22px"
          fontWeight="400"
          fontSize="14px"
          borderRadius="12px"
        >
          Price Details
        </Button>
      ) : null}

      {inputAmount ? show ? <PriceDetailsDrawer /> : null : null}
    </Flex>
  );
}

export default SwapBody;
