import React from 'react';
import { Flex, Text, chakra, Box, Image } from '@chakra-ui/react';
import { DexList, dexList } from '../../utils/dexList';

export interface RouteInfo {
  path: string[] | undefined;
  output: string;
  dex: string;
  routePercentage: string[] | undefined;
}

// TODO: support arbitrary number of routes. Current hacky solution only takes 2 routes
function BestPrice({ routes }: { routes: [RouteInfo, RouteInfo] }) {
  return (
    <Box
      maxHeight="170px"
      height="100%"
      overflowY={routes?.length > 2 ? 'auto' : 'hidden'}
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
          // backgroundColor: '#F5F5F5',
        },
        '&::-webkit-scrollbar-track': {
          width: '10px',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5af',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '10px',
        },
      }}
    >
      <Box
        position="relative"
        //  height="163px"
        w="100%"
      >
        <Box
          //  height="148px"
          w="100%"
        >
          {routes[0].path?.length ? (
            routes.map((route, idx) => {
              return (
                <Box
                  // position="absolute"
                  left="0px"
                  top="18px"
                  height="unset"
                  width="99%"
                  lineHeight="1.25"
                  borderRadius="8px"
                  // backgroundImage="linear-gradient(96.8deg,#faa43a 4.71%,#71e5ed 87.84%)"
                  // border="solid 3px transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(#101010, #101010), radial-gradient(circle at top left, #ff0078,#ffb720)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                  }}
                  marginBottom="12px"
                  key={idx}
                  css={{
                    ':nth-of-type(1)': {
                      marginTop: '12px',
                      border: 'solid 3px transparent',
                      backgroundImage:
                        'linear-gradient(#101010, #101010), radial-gradient(circle at top left, #ff0078,#ffb720)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'content-box, border-box',
                    },
                  }}
                >
                  {route.output !== '0' && route.path?.length ? (
                    <Flex
                      fontSize="14px"
                      padding="16px"
                      justifyContent="space-between"
                      alignItems="center"
                      borderRadius="8px"
                    >
                      <Flex direction="column" alignItems="center">
                        <Flex
                          alignItems="center"
                          fontWeight="semibold"
                          width="100%"
                        >
                          <Image
                            alt="exchange logo"
                            src={dexList[route?.dex as keyof DexList]?.icon}
                            width={21}
                            height={6}
                            borderRadius="12px"
                          />

                          <chakra.span marginLeft="6px">
                            {dexList[route?.dex as keyof DexList]?.name}
                          </chakra.span>
                        </Flex>

                        <Text fontSize="11px">
                          Routes found:{' '}
                          {route.path?.length ? route?.path?.length : 0}
                        </Text>
                      </Flex>
                      <Box fontWeight="semibold" textAlign="right">
                        {route.output}
                      </Box>
                    </Flex>
                  ) : null}
                </Box>
              );
            })
          ) : (
            <Flex justifyContent="center" alignItems="center" height="100%">
              No Routes found!
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default BestPrice;
