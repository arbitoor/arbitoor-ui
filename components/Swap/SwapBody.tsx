import React from 'react';
import { Box, chakra } from '@chakra-ui/react';
import SwapContent from './SwapContent';

function SwapBody() {
  return (
    <Box w="100%" maxW="450px" paddingBottom="96px">
      <chakra.form>
        <SwapContent />
        <div style={{ marginBottom: '32px' }} />
      </chakra.form>
    </Box>
  );
}

export default SwapBody;
