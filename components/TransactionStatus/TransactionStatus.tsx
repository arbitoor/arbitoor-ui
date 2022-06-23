import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { providers } from 'near-api-js';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';

function TransactionStatus() {
  const [status, setStatus] = React.useState<string>();

  const toast = useToast();

  const { selector, authKey } = useWalletSelector();

  const { network } = selector.options;
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });
  const params = location.search;
  const searchParams = new URLSearchParams(params);
  const getTransactionHashes = searchParams.get('transactionHashes');
  const txHashes = getTransactionHashes?.split(',');
  // const txHash = txHashes[1].join();

  useEffect(() => {
    if (txHashes && txHashes.length > 1 && authKey?.accountId) {
      checkTransactionStatus(txHashes[1], authKey?.accountId).then(
        (res: any) => {
          const status: any = res.status;
          const data: string | undefined = status.SuccessValue;
          if (data) {
            const buff = Buffer.from(data, 'base64');
            const value = buff.toString('ascii');

            setStatus(value);
          }
        }
      );
    }
  }, [params]);

  useEffect(() => {
    if (getTransactionHashes && status && txHashes) {
      toast({
        title:
          status.length > 3 ? 'Transaction Successful' : 'Transaction Failed',
        description: getTransactionHashes ? (
          <a
            href={`https://explorer.mainnet.near.org/transactions/${txHashes[1]}`}
            target="_blank"
            rel="noreferrer"
          >
            To view on explorer click here
          </a>
        ) : null,
        status: status.length > 3 ? 'success' : 'error',
        duration: 7000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }, [params, status]);

  async function checkTransactionStatus(txHash: string, accountId: string) {
    const result = await provider.txStatus(txHash, accountId);
    return result;
  }

  return null;
}

export default TransactionStatus;
