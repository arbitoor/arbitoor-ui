import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import Signout from './Signout';

function AccountDetails() {
  const { accountId } = useWalletSelector();

  

  return (
    <Flex
      padding="8px 6px"
      background="#26262C"
      color="whitesmoke"
      alignItems="center"
      borderRadius="28px"
    >
      <Flex minWidth="36px" justifyContent="center">
        <FontAwesomeIcon
          icon={faCircleUser}
          color="whitesmoke"
          height="20px"
          width="20px"
        />
      </Flex>
      <Box
        fontWeight="600"
        fontSize="14px"
        margin="0px 9px"
        whiteSpace="nowrap"
        maxWidth="150px"
        overflow="hidden"
        textOverflow="ellipsis"
        color="whitesmoke"
      >
        <Text>{accountId}</Text>
      </Box>
      <Flex minWidth="36px" justifyContent="center">
        <Signout />
      </Flex>
    </Flex>
  );
}

export default AccountDetails;
