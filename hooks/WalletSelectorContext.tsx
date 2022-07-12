import React, { useCallback, useContext, useEffect, useState } from 'react';
import { map, distinctUntilChanged } from 'rxjs';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMathWallet } from '@near-wallet-selector/math-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { CONTRACT_ID } from '../utils/constants';

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface Authkey {
  accountId: 'string';
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
  walletType: string | undefined;
  setAccountId: (accountId: string) => void;
  authKey: any;
  setAuthKey: any;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider = ({ children }: any) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [walletType, setWalletType] = useState<string | undefined>(undefined);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [authKey, setAuthKey] = useState<any>();

  const syncAccountState = (
    currentAccountId: string | null,
    newAccounts: Array<AccountState>
  ) => {
    if (!newAccounts.length) {
      localStorage.removeItem('accountId');
      setAccountId(null);
      setAccounts([]);

      return;
    }

    const validAccountId =
      currentAccountId &&
      newAccounts.some((x) => x.accountId === currentAccountId);
    const newAccountId = validAccountId
      ? currentAccountId
      : newAccounts[0].accountId;

    localStorage.setItem('accountId', newAccountId);
    setAccountId(newAccountId);
    setAccounts(newAccounts);
  };

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: 'mainnet',
      debug: true,
      modules: [
        setupNearWallet({
          iconUrl: '/assets/walletSelector/near-wallet-icon.png',
        }),
        setupMyNearWallet({
          iconUrl: '/assets/walletSelector/my-near-wallet-icon.png',
        }),
        setupSender({
          iconUrl: '/assets/walletSelector/sender-icon.png',
        }),
        setupMathWallet({
          iconUrl: '/assets/walletSelector/math-wallet-icon.png',
        }),
        setupNightly({
          iconUrl: '/assets/walletSelector/nightly.png',
        }),
        setupLedger({
          iconUrl: '/assets/walletSelector/ledger-icon.png',
        }),
      ],
    });

    const _modal = setupModal(_selector, { contractId: CONTRACT_ID });
    const state = _selector.store.getState();

    syncAccountState(localStorage.getItem('accountId'), state.accounts);

    window.selector = _selector;
    window.modal = _modal;
    //@ts-ignore
    setAuthKey(JSON.parse(localStorage.getItem('near_app_wallet_auth_key')));
    setWalletType(
      //@ts-ignore
      JSON.parse(localStorage.getItem('near-wallet-selector:selectedWalletId'))
    );

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert('Failed to initialise wallet selector');
    });
  }, [init]);

  console.log('type', walletType);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        syncAccountState(accountId, nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector, accountId]);

  if (!selector || !modal) {
    return null;
  }

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        authKey,
        accounts,
        accountId,
        walletType,
        setAccountId,
        setAuthKey,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      'useWalletSelector must be used within a WalletSelectorContextProvider'
    );
  }

  return context;
}
