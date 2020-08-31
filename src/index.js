import { createStore, openStorage, BULK_INSERT_MESSAGES } from './store-index';
import { Suggester } from './suggester';
import { StoreManager } from './store-manager';
import createWorker from './worker/bulk-insert';

export { Suggester } from './suggester';
export { StoreManager } from './store-manager';
export { createStore, createWorker, openStorage, BULK_INSERT_MESSAGES };
export default {
  Suggester,
  StoreManager,
  createStore,
  openStorage,
  createWorker,
  BULK_INSERT_MESSAGES,
};
