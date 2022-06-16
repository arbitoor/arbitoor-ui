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
import { useGlobalStore } from '../../utils/globalStore';

function SlippageSettings() {
  const slippageOptions = [0.1, 0.5, 1];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [slippageValue, setSlippageValue] = useGlobalStore((state) => [
    state.slippageValue,
    state.setSlippageValue,
  ]);

  function handleCustomSlippageValue(value: number) {
    setSlippageValue(value);
  }

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
              '&::WebkitBackdropFilter': 'blur(2.8px)',
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
                  {slippageOptions.map((option: number, idx: number) => (
                    <>
                      <SlippageValueButton
                        key={option}
                        text={`${option} %`}
                        margin={idx !== slippageOptions.length ? 2 : undefined}
                        onClick={() => handleCustomSlippageValue(option)}
                      />
                    </>
                  ))}
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
                    value={slippageValue}
                    onChange={(e) => {
                      setSlippageValue(+e.target.value);
                    }}
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
