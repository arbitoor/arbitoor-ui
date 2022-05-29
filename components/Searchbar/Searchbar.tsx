import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Box, Input } from '@chakra-ui/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchDropdown from './SearchDropdown';

function Searchbar() {
  const [show, setShow] = React.useState<boolean>(false);
  const toggleDropDown = () => {
    setShow(!show);
  };
  return (
    <Flex justifyContent="center" position="relative">
      <Box w="100%" maxW="450px" position="relative">
        <Box>
          <Box
            onClick={toggleDropDown}
            onBlur={toggleDropDown}
            w="100%"
            borderRadius="14px"
            bgColor="#26262C"
            padding="6px 20px"
            marginTop="8px"
            boxShadow={
              '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)'
            }
          >
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
                placeholder="You can try 10 wNEAR to USDT"
                border="none"
                _focus={{ boxShadow: 'none' }}
                color="whitesmoke"
              />
            </Flex>
          </Box>
          {show ? <SearchDropdown /> : null}
        </Box>
      </Box>
    </Flex>
  );
}

export default Searchbar;
