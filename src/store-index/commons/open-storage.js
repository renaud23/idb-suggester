/* eslint-disable no-restricted-globals */
import { CONSTANTE } from '../commons';
function getIDB() {
  return indexedDB;
  // const what = self || window;
  // return what.indexedDB || what.mozIndexedDB || what.webkitIndexedDB || what.msIndexedDB;
}

const IDB_REF = getIDB();

function openStorage(name, version = 1) {
  // const indexedDB = getIDB();
  return new Promise((resolve, reject) => {
    if (!IDB_REF) {
      reject('indexedDb not supported !');
    }
    const request = IDB_REF.open(name, version);
    let db;
    let doIt = true;

    request.onupgradeneeded = function () {
      doIt = false;
      db = request.result;
      const store = db.createObjectStore(CONSTANTE.STORE_NAME, {
        keyPath: 'id',
      });
      store.createIndex(CONSTANTE.STORE_INDEX_NAME, CONSTANTE.STORE_INDEX_PATH, {
        multiEntry: true,
      });
      resolve(db);
    };

    request.onsuccess = function () {
      db = request.result;
      if (doIt) resolve(db);
    };

    request.onerror = function (e) {
      reject(e);
    };
  });
}

export default openStorage;
