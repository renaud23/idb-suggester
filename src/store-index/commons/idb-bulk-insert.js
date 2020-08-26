const BULK_LIMIT = 300;

export const BULK_INSERT_MESSAGES = {
  complete: "bulk-insert/complete",
  finished: "bulk-insert/finished",
  error: "bulk-insert/error",
};

/* */
const pushTask = (store, transaction) => ([first, ...rest] = []) => {
  if (first) {
    const request = store.add(first);
    request.onsuccess = () => {
      if (rest.length) {
        pushTask(store, transaction)(rest);
      }
    };

    request.onerror = (e) => {
      throw e;
    };
  }
};

/* */
function split(entities, limit = BULK_LIMIT) {
  return entities.reduce(
    ([f, ...r], n, i) => {
      return (i + 1) % limit === 0 ? [[n], f, ...r] : [[n, ...f], ...r];
    },
    [[]]
  );
}

/* */
const bulkPush = (db, name, hook) => (lot, i = 0, treated = 0) => {
  const [first, ...rest] = lot;

  try {
    if (first) {
      const transaction = db.transaction(name, "readwrite");
      const store = transaction.objectStore(name);
      pushTask(store, transaction)(first);
      transaction.oncomplete = function () {
        const nextTreated = treated + first.length;
        hook({
          message: BULK_INSERT_MESSAGES.complete,
          nb: first.length,
          treated: nextTreated,
          step: i,
        });
        bulkPush(db, name, hook)(rest, i + 1, nextTreated);
      };
      transaction.onerror = function (e) {
        hook({ message: BULK_INSERT_MESSAGES.error, error: e });
      };
    } else {
      hook({ message: BULK_INSERT_MESSAGES.finished });
    }
  } catch (e) {
    hook({ message: BULK_INSERT_MESSAGES.error, error: e });
  }
};

/* */
export default (db, store, hook = () => null) => (entities = []) => {
  const lots = split(entities, BULK_LIMIT);
  return new Promise((resolve, reject) => {
    try {
      bulkPush(db, store, hook)(lots);
    } catch (e) {
      reject(e);
    }
  });
};
