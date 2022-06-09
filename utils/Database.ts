import Dexie, { Table } from 'dexie';

export interface TokenMetadata {
  id?: number;
  name: string;
  decimals: number;
  symbol: string;
  extensions: object;
  icon: string;
  logoURI: string;
  nearEnv: string;
  reference: null;
  reference_hash: null;
  tags: [];
  spec: string;
}

class IndexedDB extends Dexie {
  // 'tokens' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  tokens!: Table<TokenMetadata | undefined>;

  constructor() {
    super('arbitoorDB');
    this.version(1).stores({
      tokens: 'id, name, decimals, symbol, extensions, icon, logoURI, nearEnv, reference, reference_hash, spec,' // Primary key and indexed props
    });
  }

}



export const db = new IndexedDB();