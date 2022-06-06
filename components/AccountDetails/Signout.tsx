import React from 'react';
import { Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';

function Signout() {
  const { selector, setAuthKey } = useWalletSelector();

  async function handleSignOut() {
    // selector.signOut().catch((err) => {
    //   console.log('Failed to sign out');
    //   console.error(err);
    // });
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log('Failed to sign out');
      console.error(err);
    });
    setAuthKey(null);
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
