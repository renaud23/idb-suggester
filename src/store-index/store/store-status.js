import { CONSTANTE } from '../commons';

export const STORE_STATUS = {
  failure: 'store-status/failure',
  ready: 'store-status/ready',
};

function status(idbStore) {
  return new Promise(function (resolve, reject) {
    const { name, version } = idbStore;
    try {
      const transaction = idbStore.transaction(CONSTANTE.STORE_NAME, 'readonly');
      const store = transaction.objectStore(CONSTANTE.STORE_NAME);
      const request = store.count();
      request.onsuccess = function () {
        resolve({
          name,
          version,
          count: request.result,
          status: STORE_STATUS.ready,
        });
      };
    } catch (e) {
      resolve({ name, version, status: STORE_STATUS.failure });
    }
  });
}

export default status;
