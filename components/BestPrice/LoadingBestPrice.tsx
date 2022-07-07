import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Flex,
  Stack,
  Box,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  text?: string;
  display: string;
}

function LoadingBestPrice({ display }: Props) {
  return (
    <Stack>
      <Skeleton
        background="#494954"
        borderRadius="8px"
        height="60px"
        justifyContent="center"
        alignItems="center"
        marginTop="12px"
        p="12px"
        display={display}
        opacity="0.2"
      />
      <Box marginBottom="12px"></Box>
      <Skeleton
        background="#494954"
        borderRadius="8px"
        height="60px"
        justifyContent="center"
        alignItems="center"
        marginTop="12px"
        p="12px"
        display={display}
        opacity="0.2"
      />
    </Stack>
  );
}

export default LoadingBestPrice;
