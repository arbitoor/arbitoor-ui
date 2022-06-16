import React from 'react';
import { Flex, Text, chakra, Box, Image } from '@chakra-ui/react';
import { DexList, dexList } from '../../utils/dexList';

export interface RouteInfo {
  path: string[];
  output: string;
  dex: string;
}

// TODO support arbitrary number of routes. Current hacky solution only takes 2 routes
function BestPrice({ routes }: { routes: [RouteInfo, RouteInfo] }) {
  return (
    <Box maxHeight="163px" height="100%">
      <Box position="relative" height="163px" w="100%">
        <Box height="148px" w="100%">
          {routes &&
            routes.map((route, idx) => {
              return (
                <>
                  <Box
                    position="absolute"
                    left="0px"
                    top="18px"
                    height="unset"
                    width="99%"
                    lineHeight="1.25"
                    borderRadius="8px"
                    // backgroundImage="linear-gradient(96.8deg,#faa43a 4.71%,#71e5ed 87.84%)"
                    border="solid 3px transparent"
                    style={{
                      backgroundImage:
                        'linear-gradient(#101010, #101010), radial-gradient(circle at top left, #ff0078,#ffb720)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'content-box, border-box',
                    }}
                    key={idx}
                    css={{
                      ':nth-child(2)': {
                        top: '102px',
                        border: 'none',
                      },
                    }}
                  >
                    <Flex
                      fontSize="13px"
                      padding="16px"
                      justifyContent="space-between"
                      alignItems="center"
                      borderRadius="8px"
                    >
                      <Flex direction="column" alignItems="center">
                        <Flex alignItems="center" fontWeight="semibold">
                          <Image
                            alt="exchange logo"
                            src={dexList[route?.dex as keyof DexList].icon}
                            width={22}
                            height={6}
                            borderRadius="12px"
                          />

                          <chakra.span marginLeft="4px">
                            {dexList[route?.dex as keyof DexList].name}
                          </chakra.span>
                        </Flex>

                        <Text fontSize="11px">
                          Routes found: {route.path.length}
                        </Text>
                      </Flex>
                      <Box fontWeight="semibold" textAlign="right">
                        {route.output}
                      </Box>
                    </Flex>
                  </Box>
                </>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default BestPrice;
