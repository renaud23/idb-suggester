import { CONSTANTE, prepareStringIndexation } from '../commons';

export function filter(results, how) {
  const [stack] = Object.values(
    results.reduce(
      function ([stack, n], o) {
        const { id } = o;
        if (id in stack || n >= how) {
          return [stack, n];
        }

        return [{ ...stack, [id]: o }, n + 1];
      },
      [{}, 0]
    )
  );

  return Object.values(stack);
}

function search(store) {
  if (!store) {
    return undefined;
  }
  const { db } = store;
  return async function (prefix, how) {
    return new Promise((resolve) => {
      if (!prefix) {
        resolve(null);
        return;
      }
      const pp = prepareStringIndexation(prefix);
      const transaction = db.transaction(CONSTANTE.STORE_NAME, 'readonly');
      const store = transaction.objectStore(CONSTANTE.STORE_NAME);
      const index = store.index(CONSTANTE.STORE_INDEX_NAME);
      const range = IDBKeyRange.bound(pp, `${pp}${CONSTANTE.MAX_STRING}`);
      index.getAll(range).onsuccess = function (req) {
        if (how) {
          resolve(filter(req.target.result, how));
        }
        resolve(req.target.result);
      };
    });
  };
}

export default search;
