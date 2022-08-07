import { Box } from '@chakra-ui/react';
import React from 'react';
import TopTokensByVol from '../components/Analytics/TopTokenByVol/TopTokensByVol';

function Stats() {
  return (
    <Box height="100vh" mx="auto" padding="0 1rem" maxWidth="62.5%">
      <TopTokensByVol />
    </Box>
  );
}

export default Stats;
