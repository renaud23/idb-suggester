export const createEntity = (db, store) => entity => {
  // TODO
};

export const deleteEntity = (db, store) => entity => {};

export const getEntity = (db, store) => id =>
  new Promise((res, rej) => {
    const transaction = db.transaction(store, "readonly");
    const objStore = transaction.objectStore(store);
    const request = objStore.get(id);

    request.onsuccess = () => {
      res(request.result);
    };
    request.onerror = e => rej(e);
  });

export const putEntity = (db, store) => entity => {};

export default (db, store) => ({
  create: createEntity(db, store),
  delete: deleteEntity(db, store),
  get: getEntity(db, store),
  put: putEntity(db, store)
});
