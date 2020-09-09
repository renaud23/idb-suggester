import { Suggester } from './suggester';
import { StoreManager } from './store-manager';

export { Suggester, SearchIconDefault } from './suggester';
export { StoreManager } from './store-manager';
export { createStore, useStoreIndex } from './store-index';
export { default as createWorker } from './worker/bulk-insert';

export default { Suggester, StoreManager };
