import create from "zustand";
import { RouteInfo } from '../components/BestPrice/BestPrice'
import { TokenMetadata } from "./Database";

interface GlobalStore {
  inputAmount: string;
  paths: RouteInfo[];
  tokenListDB: TokenMetadata[];
  setInputAmount: (amount: string) => void;
  setPaths: (path: RouteInfo[]) => void;
  setTokenListDB: (list: TokenMetadata[]) => void;
}

export const useGlobalStore = create<GlobalStore>(((set, get) => ({

  inputAmount: '',
  paths: [],
  tokenListDB: [],
  setInputAmount: (amount: string) => set({ inputAmount: amount }),
  setPaths: (path: RouteInfo[]) => set({ paths: path }),
  setTokenListDB: (list: TokenMetadata[]) => set({ tokenListDB: list })

}
)));