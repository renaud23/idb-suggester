/* eslint-disable no-restricted-globals */
import { createStore, bulkInsert } from "../store";
import {
  BULK_INSERT_MESSAGES,
  CONSTANTE,
  prepareStringIndexation,
  createTokenizer,
} from "../commons";

function createPrepareEntity(fields = [], tokenize = false) {
  const tokenizeIt = createTokenizer(fields);
  return function (entity) {
    const searching = fields.reduce(function (a, field) {
      const { name } = field;
      if (name in entity) {
        if (tokenize) {
          return [...a, ...tokenizeIt(field, entity)];
        }
        return [...a, prepareStringIndexation(`${entity[name]}`)];
      }
      return a;
    }, []);
    return { ...entity, [CONSTANTE.STORE_INDEX_PATH]: searching };
  };
}

self.onmessage = (e) => {
  const { data } = e;
  const { idbName, entities, fields, tokenize } = data;
  if (!idbName) return;
  const prepareEntity = createPrepareEntity(fields, tokenize);
  const preparedEntities = entities.map(function (e) {
    return prepareEntity(e);
  });

  createStore(idbName).then(function (store) {
    bulkInsert(store, preparedEntities, function (arg) {
      self.postMessage(arg);
      const { message } = arg;
      if (message === BULK_INSERT_MESSAGES.finished) {
        self.close();
      }
    });
  });
};

export default () => null;
