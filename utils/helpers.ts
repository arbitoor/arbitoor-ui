import Big from 'big.js'
import { Account } from 'near-api-js';
import BigNumber from 'bignumber.js';
import type { CodeResult, Provider } from 'near-api-js/lib/providers/provider';


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

export const getBalance = async (
  token_address: string,
  accountId: string,
  provider: Provider
) => {
  if (!token_address || !accountId) return;
  try {
    const getTokenBalance = await provider.query<CodeResult>({
      request_type: 'call_function',
      account_id: token_address,
      method_name: 'ft_balance_of',
      args_base64: Buffer.from(
        JSON.stringify({ account_id: accountId })
      ).toString('base64'),
      finality: 'optimistic',
    });
    const userTokenBalance = JSON.parse(
      Buffer.from(getTokenBalance.result).toString()
    );
    return userTokenBalance;
  } catch (error) {
    console.log(error);
  }
}

export function formatVol(value, decimalMap, tokenAddress) {
  const decimals =
    decimalMap.filter((tokenData) => {
      return tokenData.address === tokenAddress;
    })[0]?.decimals ?? 18;

  return new BigNumber(10)
    .pow(-decimals)
    .multipliedBy(new BigNumber(value))
    .toString();
}
export function formatTokenAdd(tokenMetaDataMap, tokenAddress) {
  const tokenTicker =
    tokenMetaDataMap.filter((tokenData) => {
      return tokenData.address === tokenAddress;
    })[0]?.symbol ?? tokenAddress.slice(0, 10);
  // console.log({ tokenTicker });
  return tokenTicker;
}
export function formatDexAdd(dexDataMap, dexAddress) {
  return dexDataMap[dexAddress].name;
  // return dexName;
}

export const formatAmount = (val) => `$` + val
export const parseAmount = (val) => val.replace(/^\$/, '')