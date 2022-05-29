import React, { useEffect, useState } from 'react';
import { Button, Box, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  text: string | null;
  swapHandler?: () => void;
  btnType?: string;
  isLoading?: boolean;
  isSignedIn?: any;
}

function CustomButton({
  text,
  swapHandler,
  btnType,

  isSignedIn,
  ...props
}: Props) {
  if (isSignedIn && btnType === 'swap') {
    return (
      <Button
        position="relative"
        width="100%"
        color="white"
        borderRadius="14px"
        height="56px"
        marginTop="16px"
        onClick={swapHandler}
        // bg="linear-gradient(90deg, rgba(65,65,65,1) 0%, rgba(0,0,0,1) 100%)"
        bg="radial-gradient(circle at left top, #ff0078, #ffb720 100%)"
        _hover={{ opacity: '1' }}
        {...props}
      >
        Swap
      </Button>
    );
  }
  return (
    <>
      <Box>
        <Button
          position="relative"
          width="100%"
          color="white"
          borderRadius="14px"
          height="56px"
          marginTop="16px"
          onClick={swapHandler}
          opacity="0.75"
          // bg="linear-gradient(90deg, rgba(65,65,65,1) 0%, rgba(0,0,0,1) 100%)"
          bg="radial-gradient(circle at left top, #ff0078, #ffb720 100%)"
          _hover={{ opacity: '1' }}
          {...props}
        >
          {text}
        </Button>
      </Box>
    </>
  );
}

export default CustomButton;
