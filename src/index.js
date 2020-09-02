import { Suggester } from './suggester';
import { StoreManager } from './store-manager';

export { Suggester } from './suggester';
export { StoreManager } from './store-manager';
export { createStore } from './store-index';
export { default as createWorker } from './worker/bulk-insert';

export default { Suggester, StoreManager };
