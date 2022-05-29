import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';

function Signout() {
  const { selector } = useWalletSelector();

  function handleSignOut() {
    selector.signOut().catch((err) => {
      console.log('Failed to sign out');
      console.error(err);
    });
  }
  return (
    <Box onClick={handleSignOut} cursor="pointer">
      <FontAwesomeIcon
        icon={faPowerOff}
        color="#f54040"
        height="18px"
        width="18px"
      />
    </Box>
  );
}

export default Signout;
