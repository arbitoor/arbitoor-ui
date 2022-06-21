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
  const transactionHashes = searchParams.get('transactionHashes');

  useEffect(() => {
    if (transactionHashes && authKey?.accountId) {
      checkTransactionStatus(transactionHashes, authKey?.accountId).then(
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
  }, [transactionHashes]);

  useEffect(() => {
    if (transactionHashes && status) {
      toast({
        title:
          status.length > 3 ? 'Transaction Successful' : 'Transaction Failed',
        description: transactionHashes ? (
          <a
            href={`https://explorer.mainnet.near.org/transactions/${transactionHashes}`}
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
  }, [transactionHashes, status]);

  async function checkTransactionStatus(txHash: string, accountId: string) {
    const result = await provider.txStatus(txHash, accountId);
    return result;
  }

  return null;
}

export default TransactionStatus;
