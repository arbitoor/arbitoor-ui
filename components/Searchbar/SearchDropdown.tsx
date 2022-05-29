import React from 'react';
import { Flex, Box, Text, chakra } from '@chakra-ui/react';
import { topTradedPairs } from '../../utils/top5Pairs';

interface Pair {
  id: string;
  ticker: string;
  url: string;
  description: string;
}

function SearchDropdown() {
  return (
    <Box
      position="absolute"
      top="64px"
      left="0"
      maxW="448px"
      w="100%"
      zIndex="20"
    >
      <Flex
        // bgColor="white"
        bgColor="#26262C"
        borderRadius="14px"
        boxShadow={
          '0 0 #0000,0 0 #0000,0 0 #0000,0 0 #0000,0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)'
        }
        maxH="90vh"
        height="100%"
        width="100%"
        direction="column"
        color="whitesmoke"
      >
        <Box
          maxH="50vh"
          color="black"
          overflowY="scroll"
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
              backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-track': {
              width: '10px',
              borderRadius: '10px',
              backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '10px',
            },
          }}
        >
          <Text
            lineHeight="1.5"
            paddingX="20px"
            paddingTop="16px"
            color="whitesmoke"
          >
            Top Traded Pairs
          </Text>
          {topTradedPairs.map((pair) => {
            return (
              <chakra.a href={pair.url} key={pair.id} color="whitesmoke">
                <Box _hover={{ bgColor: '#de8f1761' }} padding="14px 48px">
                  <Flex>
                    <Flex>
                      <Flex direction="column">
                        <Text>{pair.ticker}</Text>
                        <Text fontSize="12px">{pair.description}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
                <Text></Text>
              </chakra.a>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}

export default SearchDropdown;
