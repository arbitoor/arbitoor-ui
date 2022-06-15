import { Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  text: string;
  margin: number | undefined;
  onClick: () => void;
}

function SlippageValueButton({ text, ...props }: Props) {
  return (
    <>
      <Button
        variant="outline"
        _active={{ bgColor: '#de8f1761' }}
        _hover={{ bgColor: '#de8f1761' }}
        bg="transparent"
        flex="1 1 0%"
        _focus={{ boxShadow: 'none' }}
        borderColor="#d09a4b"
        {...props}
      >
        {text}
      </Button>
    </>
  );
}

export default SlippageValueButton;
