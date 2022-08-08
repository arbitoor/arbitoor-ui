import create from "zustand";
import { RouteInfo } from '../components/BestPrice/BestPrice'
import { TokenMetadata } from "./Database";

interface GlobalStore {
  inputAmount: string;
  paths: RouteInfo[];
  tokenListDB: TokenMetadata[];
  slippageValue: number;
  txHashes: [];
  txHash: string;
  setInputAmount: (amount: string) => void;
  setPaths: (path: RouteInfo[]) => void;
  setTokenListDB: (list: TokenMetadata[]) => void;
  setSlippageValue: (value: number) => void;
  setTxHash: (tx: string) => void;

}

export const useGlobalStore = create<GlobalStore>(((set, get) => ({

  inputAmount: '',
  paths: [],
  tokenListDB: [],
  slippageValue: 0.5,
  txHashes: [],
  txHash: '',
  setInputAmount: (amount: string) => set({ inputAmount: amount }),
  setPaths: (path: RouteInfo[]) => set({ paths: path }),
  setTokenListDB: (list: TokenMetadata[]) => set({ tokenListDB: list }),
  setSlippageValue: (value: number) => set({ slippageValue: value }),
  setTxHashes: (values: []) => set({ txHashes: values }),
  setTxHash: (value: string) => set({ txHash: value })

}
)));