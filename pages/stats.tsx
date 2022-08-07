import { Box } from '@chakra-ui/react';
import React from 'react';
import TopDexByVol from '../components/Analytics/TopDexByVol/TopDexByVol';
import TopTokensByVol from '../components/Analytics/TopTokenByVol/TopTokensByVol';

function Stats() {
  return (
    <Box height="100vh" mx="auto" padding="0 1rem" maxWidth="62.5%">
      <Box margin="48px" />
      <TopTokensByVol />
      <Box margin="48px" />
      <TopDexByVol />
    </Box>
  );
}

export default Stats;
