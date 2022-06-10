import Dexie from 'dexie';


export interface TokenMetadata {
  id?: number;
  name: string;
  address: string;
  decimals: number;
  symbol: string;
  extensions?: any;
  icon?: string | null;
  logoURI?: string;
  nearEnv?: string | undefined;
  reference?: string | null;
  reference_hash?: string | null;
  tags?: string[] | undefined;
  spec: string;
}

class IndexedDb extends Dexie {
  // 'tokens' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  tokensMetadata!: Dexie.Table<TokenMetadata>;

  constructor() {
    super('arbitoorDB');
    this.version(1).stores({
      tokensMetadata: 'name,name, address, decimals, symbol, extensions, icon, logoURI, nearEnv, reference, reference_hash, spec', // Primary key and indexed props
    });
  }

}



export const db = new IndexedDb();