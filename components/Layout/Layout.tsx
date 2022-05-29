import React from 'react';
import { Flex } from '@chakra-ui/react';

interface AppProps {
  children: React.ReactNode;
}

function Layout({ children }: AppProps) {
  return (
    <Flex padding="0 32px" direction="column" minHeight="100vh">
      {children}
    </Flex>
  );
}

export default Layout;
