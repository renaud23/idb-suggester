import { idbBulkInsert, CONSTANTE } from "../commons";

async function bulk(store, entities, hook = () => null) {
  const { db } = store;
  return await idbBulkInsert(db, CONSTANTE.STORE_NAME, hook)(entities);
}

export default bulk;
