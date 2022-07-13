import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { providers } from 'near-api-js';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import { useGlobalStore } from '../../utils/globalStore';

function TransactionStatus() {
  const [status, setStatus] = React.useState<string>('');

  const txHash = useGlobalStore((state) => state.txHash);

  const toast = useToast();

  const { selector, authKey, accountId } = useWalletSelector();

  const { network } = selector.options;
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });
  const params = location.search;
  const searchParams = new URLSearchParams(params);
  const getTransactionHashes = searchParams.get('transactionHashes');
  const txHashFromURL = getTransactionHashes?.split(',') || [];
  // const txHash = txHashes[1].join();

  useEffect(() => {
    const txHashURL =
      txHashFromURL?.length && txHashFromURL[txHashFromURL?.length - 1];
    getTxStatus(txHashURL || txHash, authKey?.accountId || accountId);
  }, [params, txHash, txHashFromURL]);

  function getTxStatus(txHash: string, accountId: string) {
    if (!txHash || !accountId) {
      return;
    }
    checkTransactionStatus(txHash, accountId).then((res: any) => {
      const status: any = res.status;
      const data: string | undefined = status.SuccessValue;

      if (data) {
        const buff = Buffer.from(data, 'base64');
        const value = buff.toString('ascii');

        setStatus(value);
      }
    });
  }

  function showToast(status: string, txHash: string) {
    if (!status && !txHash) {
      return;
    }
    toast({
      title:
        status?.length > 3 ? 'Transaction Successful' : 'Transaction Failed',
      description: txHash.length ? (
        <a
          href={`https://explorer.mainnet.near.org/transactions/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          To view on explorer click here
        </a>
      ) : null,
      status: status?.length > 3 ? 'success' : 'error',
      duration: 7000,
      isClosable: true,
      position: 'bottom-left',
    });
  }

  useEffect(() => {
    const txHashURL =
      txHashFromURL?.length && txHashFromURL[txHashFromURL?.length - 1];
    if (!status) return;
    showToast(status, txHashURL || txHash);
  }, [status]);

  async function checkTransactionStatus(txHash: string, accountId: string) {
    const result = await provider.txStatus(txHash, accountId);
    return result;
  }

  return null;
}

export default TransactionStatus;
