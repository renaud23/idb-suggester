import { useState, useEffect } from 'react';
import createStore from './create-store';

function useStoreIndex(name, version, fields) {
  const [store, setStore] = useState(undefined);
  useEffect(
    function () {
      async function init() {
        setStore(await createStore(name, version, fields));
      }

      init();
    },
    [name, version, fields]
  );

  return store;
}

export default useStoreIndex;
