import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  text: string;
  display: string;
}

function LoadingBestPrice({ text, display }: Props) {
  return (
    <Flex
      background="#494954"
      borderRadius="8px"
      height="140px"
      justifyContent="center"
      alignItems="center"
      marginTop="12px"
      display={display}
    >
      {text}
    </Flex>
  );
}

export default LoadingBestPrice;
