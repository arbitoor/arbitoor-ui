import create from "zustand";
import { RouteInfo } from '../components/BestPrice/BestPrice'

// interface GlobalStore {
//   connectionState: {
//     isLoading: boolean;
//     wallet: any;
//     isSignedIn: boolean;

//   }
//   actions: {
//     connection: {
//       setIsLoading: (state: boolean) => void;
//       setWallet: (wallet: any) => void;
//       setIsSignedIn: (status: boolean) => void;

//     }
//   }

// }

// export const useGlobalStore = create<GlobalStore>(((set, get) => ({
//   connectionState: {
//     isLoading: false,
//     wallet: null,
//     isSignedIn: false
//   },
//   actions: {
//     connection: {
//       setIsLoading: (state) => {
//         set((prevState) => ({
//           ...prevState,
//           connectionState: {
//             ...prevState.connectionState,
//             isLoading: state,
//           }
//         }))
//       },
//       setWallet: (wallet) => {
//         set((prevState) => ({
//           ...prevState,
//           connectionState: {
//             ...prevState.connectionState,
//             wallet: wallet
//           }
//         }))
//       },
//       setIsSignedIn: (status) => {
//         set((prevState) => ({
//           ...prevState,
//           connectionState: {
//             ...prevState.connectionState,
//             isSignedIn: status
//           }
//         }))
//       }
//     }
//   }
// }

// )));

interface GlobalStore {
  inputAmount: string;
  paths: RouteInfo[]
  setInputAmount: (amount: string) => void;
  setPaths: (path: RouteInfo[]) => void;
}

export const useGlobalStore = create<GlobalStore>(((set, get) => ({

  inputAmount: '',
  paths: [],
  setInputAmount: (amount: string) => set({ inputAmount: amount }),
  setPaths: (path: RouteInfo[]) => set({ paths: path })

}
)));