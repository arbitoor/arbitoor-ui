import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  Image,
  Flex,
  Box,
  chakra,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import SlippageValueButton from './SlippageValueButton';

function SlippageSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        _focus={{ boxShadow: 'none' }}
        onClick={onOpen}
        bg="transparent"
        _hover={{ background: '#de8f1761' }}
      >
        <FontAwesomeIcon
          icon={faSliders}
          color="whitesmoke"
          height="18px"
          width="18px"
          cursor="pointer"
        />
      </Button>

      <Box marginRight="0 !important">
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay
            css={{
              background: '#00000050',
              backdropFilter: 'blur(2.7px)',
              '&::-webkit-backdrop-filter': 'blur(2.8px)',
            }}
          />
          <ModalContent
            maxHeight="45vh"
            height="100%"
            overflow="hidden"
            width={['92%', '92%', '100%', '100%']}
            position="fixed"
            background="#26262C"
          >
            <ModalHeader>
              <Text color="whitesmoke">Settings</Text>
              <ModalCloseButton
                _focus={{ boxShadow: 'none' }}
                color="whitesmoke"
                _hover={{ backgroundColor: '#de8f1761' }}
                alignItems="center"
              />
            </ModalHeader>

            <ModalBody pb={6} borderTop="1px solid #eee">
              <Box color="whitesmoke">
                <Text m="8px">Slippage Settings</Text>
                <Flex justifyContent="space-around" m="16px 0">
                  <SlippageValueButton slippageValue="0.1%" />
                  <SlippageValueButton slippageValue="0.5%" m="0 8px" />
                  <SlippageValueButton slippageValue="1%" />
                </Flex>
                <InputGroup border="1px solid #d09a4b" borderRadius="6px">
                  <InputLeftAddon bg="transparent" border="none">
                    Custom Slippage
                  </InputLeftAddon>
                  <Input
                    border="none"
                    _focus={{ boxShadow: 'none' }}
                    variant="outline"
                    fontWeight="600"
                    fontSize="1.125rem"
                    textAlign="right"
                    placeholder="0.00"
                    type="number"
                    minWidth="30%"
                    // value={inputAmount}
                    // onChange={handleInputChange}
                    // width={['50%', '50%', '100%', '100%']}
                  />
                  <InputRightAddon bg="transparent" border="none">
                    %
                  </InputRightAddon>
                </InputGroup>
                <Flex
                  justifyContent="center"
                  m="22px"
                  marginTop={['28px', '28px', '28px', '65px']}
                >
                  <Button
                    bg=" #de8f1761"
                    // variant="filled"
                    _hover={{ backgroundColor: '#d09a4b' }}
                    _focus={{ boxShadow: 'none' }}
                    onClick={onClose}
                  >
                    Save Settings
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default SlippageSettings;
