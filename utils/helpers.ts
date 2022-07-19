import Big from 'big.js'
import { Account } from 'near-api-js';

export function debounce(cb: any, delay: any) {
  let timer: any;
  return function (...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function percentToNumber(value: any) {
  return (value / 100);
}

/**
 * Get balance of the account as a BN
 */
export const ftBalanceOf = async (
  account: Account,
  tokenId: string,
  accountId: string
) => {
  return account
    .viewFunction(tokenId, 'ft_balance_of', { account_id: accountId })
    .then((n) => new Big(n))
    .catch(() => {
      return new Big(0);
    });
};

