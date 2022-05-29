import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';

function Footer() {
  return (
    <Flex
      flex=" 1"
      padding={['1rem 2rem', '1rem 2rem', '1rem 0', '1rem 0']}
      borderTop="1px solid #bababa"
      justifyContent="center"
      alignItems="center"
      fontSize="0.8rem"
      lineHeight=" 1rem"
      // color="rgba(0, 0, 0, 0.35)"
      color="#bababa"
      backgroundColor="linear-gradient(155deg, #202020 20%, #000 180%);"
    >
      <chakra.a href="/" target="_blank" rel="noopener noreferrer">
        Arbitoor: The Key Liquidity Aggregator and Swap Infrastructure for Near
        Protocol
      </chakra.a>
    </Flex>
  );
}

export default Footer;
