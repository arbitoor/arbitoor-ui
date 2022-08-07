import { Box, chakra } from '@chakra-ui/react';
import React from 'react';

function ChartTitle({ title }) {
  return (
    <chakra.h3 color="white" fontWeight="semibold" fontSize="20px">
      {title}
    </chakra.h3>
  );
}

export default ChartTitle;
