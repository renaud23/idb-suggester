import { CONSTANTE } from "../commons";

/**
 *
 */
async function clearStore(store) {
  const { db } = store;
  new Promise((resolve) => {
    const transaction = db.transaction(CONSTANTE.STORE_NAME, "readwrite");

    transaction.oncomplete = () => {
      resolve(true);
    };
    const storeIndex = transaction.objectStore(CONSTANTE.STORE_NAME);
    storeIndex.clear();
  });
}

export default clearStore;
