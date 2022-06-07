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
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

function SlippageSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
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
        <Modal
          // initialFocusRef={initialRef}
          // finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          // size={'md'}
        >
          <ModalOverlay
            css={{
              background: '#00000050',
              // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(2.7px)',
              '&::-webkit-backdrop-filter': 'blur(2.8px)',
            }}
          />
          <ModalContent
            maxHeight="40vh"
            height="100%"
            overflow="hidden"
            width={['92%', '92%', '100%', '100%']}
            position="fixed"
            background="#26262C"
            // left={['', '']}
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
              {/* <Box
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
                  Content
                </Box>
              </Flex>
            </Box> */}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default SlippageSettings;
