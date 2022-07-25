import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import Signout from './Signout';
import NearBalance from './NearBalance';

function AccountDetails() {
  const { authKey, accountId } = useWalletSelector();

  return (
    <Flex
      // padding="10px 6px"
      height="40px"
      background="#26262C"
      color="whitesmoke"
      alignItems="center"
      borderRadius="28px"
      maxWidth="260px"
      width="100%"
      justifyContent="flex-end"
    >
      <NearBalance />
      <Flex
        fontWeight="normal"
        fontSize="14px"
        margin="0px 6px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        color="whitesmoke"
        height="36px"
        borderRadius="26px"
        background="#58585e"
        justifyContent="space-evenly"
        alignItems="center"
        minWidth="160px"
      >
        <Text>{authKey?.accountId || accountId}</Text>
        <Signout />
      </Flex>
    </Flex>
  );
}

export default AccountDetails;
