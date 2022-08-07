import React, { useEffect } from 'react';
import { Box, chakra, Button, Flex, Spinner } from '@chakra-ui/react';
import { TokenListProvider, TokenInfo } from '@tonic-foundation/token-list';

import { db, TokenMetadata } from '../../utils/Database';
import SwapContent from './SwapContent';
import PriceDetailsDrawer from '../PriceDetails/PriceDetailsDrawer';
import { useGlobalStore } from '../../utils/globalStore';

function SwapBody() {
  const inputAmount = useGlobalStore((state) => state.inputAmount);
  const paths = useGlobalStore((state) => state.paths);

  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>();

  const togglePriceDetailsDrawer = () => {
    setShow(!show);
  };

  // const tokensCount = useLiveQuery(() => db.tokensMetadata.count());

  return (
    <Flex
      direction="column"
      alignItems="center"
      w="100%"
      maxW="450px"
      paddingBottom="96px"
    >
      <chakra.form width="100%">
        {!loading ? (
          <SwapContent />
        ) : (
          //TODO: MUST add a custom loading spinner
          <Flex justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#F18652"
              size="xl"
            />
          </Flex>
        )}
        <div style={{ marginBottom: '32px' }} />
      </chakra.form>
      {+inputAmount > 0 && paths[0]?.path?.length ? (
        <Button
          color="whitesmoke"
          _focus={{ border: 'none' }}
          _hover={{ background: '#de8f1761' }}
          variant="unstyled"
          onClick={togglePriceDetailsDrawer}
          bg="#26262C"
          p="6px 22px"
          fontWeight="400"
          fontSize="14px"
          borderRadius="12px"
        >
          Price Details
        </Button>
      ) : null}

      {inputAmount ? show ? <PriceDetailsDrawer /> : null : null}
    </Flex>
  );
}

export default SwapBody;
