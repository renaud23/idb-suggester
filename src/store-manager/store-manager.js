import React, { useEffect, useState, useCallback } from 'react';
import { openStorage, storeStatus } from '../store-index';
import StoreStatus from './store-manager-status';
import StoreManagerActions from './store-manager-actions';
import './store-manager.scss';

function StoreManager({ name, version, fields, fetch, tokenize = false }) {
  const [store, setStore] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  useEffect(
    function () {
      try {
        (async function () {
          setStore(await openStorage(name, version));
        })();
      } catch (e) {
        // TODO
      }
    },
    [name, version]
  );

  useEffect(
    function () {
      if (store) {
        (async function () {
          setStatus(await storeStatus(store));
        })();
      }
    },
    [store]
  );

  const refresh = useCallback(
    function () {
      (async function () {
        setStatus(await storeStatus(store));
      })();
    },
    [store]
  );

  return (
    <div className="store-manager">
      <StoreStatus status={status} />
      <StoreManagerActions
        tokenize={tokenize}
        store={store}
        fields={fields}
        status={status}
        fetch={fetch}
        refresh={refresh}
      />
    </div>
  );
}

export default StoreManager;
