import React, { useEffect, useState, useCallback } from 'react';
import * as nearAPI from 'near-api-js';
import { useRouter } from 'next/router'
import { AccountView, CodeResult } from 'near-api-js/lib/providers/provider';
import { providers, utils } from 'near-api-js';
import { Account } from '../types';
import { useGlobalStore } from '../utils/globalStore';
import { useWalletSelector } from './WalletSelectorContext';


function useConnection() {
  
  const { selector, accounts, accountId, setAccountId } = useWalletSelector();

  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [isLoading, isSignedIn, setIsLoading, setIsSignedIn] = useGlobalStore((state) => [state.connectionState.isLoading,
  state.connectionState.isSignedIn,
  state.connectionState.wallet,
  state.actions.connection.setIsLoading,
  state.actions.connection.setIsSignedIn,
  state.actions.connection.setWallet,
  ]);

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { nodeUrl } = selector.network;
    const provider = new providers.JsonRpcProvider({ url: nodeUrl });

    return provider
      .query<AccountView>({
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.network]);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setLoading(false);
      setIsSignedIn(true);

    });
  }, [accountId, getAccount]);

  const handleSignIn = () => {
    // wallet.requestSignIn();
    selector.show();
  };
  console.log(accountId)
  function handleSignOut() {
    // wallet?.signOut();
    // localStorage.clear();
    // setStorageData(null)
    selector.signOut().catch((err) => {
      console.log('Failed to sign out');
      console.error(err);
    });
    // setIsSignedIn(false)
    // router.push('/')
  };

  return {
    // load,
    isLoading,
    handleSignIn,
    handleSignOut,
    isSignedIn
  }
}

export default useConnection