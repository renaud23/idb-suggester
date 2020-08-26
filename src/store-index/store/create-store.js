import { openStorage } from "../commons";

export const ID_STORE_IDENTIFIER = "idb-store/store-index";

async function create(name, version, fields = []) {
  const db = await openStorage(name, version, fields);
  return { id: ID_STORE_IDENTIFIER, db, name, version };
}

export default create;
