import React, { useEffect } from 'react';
import { useWalletSelector } from '../../hooks/WalletSelectorContext';
import { toPrecision } from '@arbitoor/arbitoor-core';
import type { AccountView } from 'near-api-js/lib/providers/provider';
import { providers } from 'near-api-js';

function NearBalance() {
  const { authKey, accountId, selector } = useWalletSelector();
  const [nearBalance, setNearBalance] = React.useState<string>('');

  const isSignedIn = selector.isSignedIn();
  const { network } = selector.options;
  const provider = new providers.JsonRpcProvider({
    url: network.nodeUrl,
  });

  const getNearBalance = async () => {
    const response = await provider.query<AccountView>({
      request_type: 'view_account',
      finality: 'final',
      account_id: authKey?.accounId || accountId,
    });

    if (response) {
      const nearBalance = (+response?.amount * Math.pow(10, -24)).toString();
      setNearBalance(toPrecision(nearBalance, 2));
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getNearBalance();
    }
  }, [isSignedIn]);

  return <div>{nearBalance} NEAR</div>;
}

export default NearBalance;
