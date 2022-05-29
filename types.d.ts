import { AccountView } from "near-api-js/lib/providers/provider";

export type Account = AccountView & {
  account_id: string;
};
export type Token = {
  id: string;
  icon: string;
  ticker: string;
  description: string;
  decimals: number;
}