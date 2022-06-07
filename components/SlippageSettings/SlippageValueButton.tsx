import { Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  slippageValue: string;
  m?: string;
}

function SlippageValueButton({ slippageValue, ...props }: Props) {
  return (
    <>
      <Button
        variant="outline"
        _hover={{ bgColor: '#de8f1761' }}
        bg="transparent"
        flex="1 1 0%"
        _focus={{ boxShadow: 'none' }}
        borderColor="#d09a4b"
        {...props}
      >
        {slippageValue}
      </Button>
    </>
  );
}

export default SlippageValueButton;
