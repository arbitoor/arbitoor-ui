import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Input,
  Text,
  Image,
  Flex,
  Box,
  chakra,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TokenMetadata } from '../../utils/Database';
import { providers } from 'near-api-js';

import { useGlobalStore } from '../../utils/globalStore';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import { ftBalanceOf, getBalance } from '../../utils/helpers';
import { useInMemoryProvider } from '../../hooks/useInMemoryProvider';
// import { tokenList } from '../../utils/tokenList';
// import { Token } from '../../types';

interface Props {
  selectToken: (token: TokenMetadata) => void;
  token: TokenMetadata | undefined;
}

function TokenList({ selectToken, token }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selector, authKey, accountId } = useWalletSelector();

  const { network } = selector.options;
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const tokenListDB = useGlobalStore((state) => state.tokenListDB);
  const [filteredList, setFilteredList] =
    React.useState<TokenMetadata[]>(tokenListDB);

  //TO Show Token balance in the tokenlist modal

  // async function getAllTokensBalance(tokenList: any) {
  //   const filteredData = [];

  //   for (const tokenData of tokenList) {
  // // getBalance function is a 'call' method which comsumes gas. Not optimum way to get all the balance in the list
  //     const rawTokenBalance = await getBalance(
  //       tokenData?.address,
  //       authKey?.accountId || accountId,
  //       provider
  //     );
  //     const formattedTokenBalance = (
  //       rawTokenBalance * Math.pow(10, -tokenData?.decimals)
  //     ).toString();
  //     const tokenTicker = tokenData?.symbol;
  //     const tickerName = tokenData?.name;
  //     const logoURI = tokenData?.logoURI;

  //     filteredData.push({
  //       tokenTicker,
  //       tickerName,
  //       formattedTokenBalance,
  //       logoURI,
  //     });
  //   }
  //   console.log({ filteredData });
  //   // setFilteredList(filteredData);
  // }

  // useEffect(() => {
  //   getAllTokensBalance(tokenListDB);
  // }, [tokenListDB]);

  const handleSearch = (e: any) => {
    const { value } = e.target;

    if (!value.length) {
      setFilteredList(tokenListDB);
    }
    //TODO: add filter via token address
    const filteredData = _.filter(tokenListDB, (data) => {
      return data.symbol.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });

    setFilteredList(filteredData);
  };

  return (
    <>
      <Button
        _focus={{ boxShadow: 'none' }}
        onClick={onOpen}
        padding="8px"
        borderRadius="8px"
        width="33%"
        backgroundColor="transparent"
        // _hover={{ backgroundColor: 'rgb(243 244 246/1)' }}
        _hover={{ backgroundColor: '#de8f1761' }}
      >
        <Flex>
          <Flex alignItems="center">
            <Image
              alt="tickLogo"
              src={token?.logoURI || '/assets/icons/cross.png'}
              width={22}
              height={5}
              borderRadius="12px"
            />
            <Text marginLeft="6px"> {token?.symbol}</Text>
            <Image
              src="/assets/icons/downArrow.svg"
              alt="arrow down"
              width={3}
              height={3}
              marginLeft="6px"
            />
          </Flex>
        </Flex>
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay
          css={{
            background: '#5d5d6db1',
            // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(7.8px)',
            '&::WebkitBackdropFilter': 'blur(7.8px)',
          }}
        />
        <ModalContent
          maxHeight="90vh"
          height="100%"
          overflow="hidden"
          width={['92%', '92%', '100%', '100%']}
          position="fixed"
          background="#26262C"
        >
          <ModalHeader>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="whitesmoke"
                  height="18px"
                  width="18px"
                />
              </Flex>
              <Input
                color="whitesmoke"
                placeholder="Search by token or paste address"
                border="none"
                _focus={{ boxShadow: 'none' }}
                ref={initialRef}
                onChange={(e) => handleSearch(e)}
              />
            </Flex>
          </ModalHeader>

          <ModalBody pb={6} borderTop="1px solid #eee">
            <Box
              position="absolute"
              top="110px"
              left="0"
              maxW="448px"
              w="100%"
              zIndex="20"
            >
              <Flex
                bgColor="#26262C"
                borderRadius="14px"
                boxShadow={
                  '0 0 #0000,0 0 #0000,0 0 #0000,0 0 #0000,0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)'
                }
                maxH="90vh"
                height="100%"
                width="100%"
                direction="column"
              >
                <Box
                  maxH="75vh"
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
                  {filteredList &&
                    filteredList.map((token: TokenMetadata) => {
                      return (
                        <chakra.a key={token.address} onClick={onClose}>
                          <Box
                            color="whitesmoke"
                            _hover={{ bgColor: '#de8f1761' }}
                            padding="14px 48px"
                            onClick={() => {
                              selectToken(token);
                              setFilteredList(tokenListDB);
                            }}
                          >
                            <Flex>
                              <Image
                                alt="ticker logo"
                                src={token.logoURI || '/assets/icons/cross.png'}
                                width="30px"
                                height="28px"
                                borderRadius="12px"
                              />
                              <Flex>
                                <Flex direction="column">
                                  <Text>{token.symbol}</Text>
                                  <Text fontSize="12px">{token.name}</Text>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Box>
                        </chakra.a>
                      );
                    })}
                </Box>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TokenList;
