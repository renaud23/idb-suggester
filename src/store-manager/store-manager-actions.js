import React, { useState, useCallback } from 'react';
import StoreManagerTitle from './store-manager-title';
import { STORE_STATUS, clearStore, createStore } from '../store-index';
import Button from './store-button';
import { BulkTaskProgress } from '../store-manager';

function Separator() {
  return <span className="store-manager-separator" />;
}

function ActionLoad({ status, fetch, fields, onStartLoad, onEndLoad, tokenize }) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(undefined);

  const handleLoad = useCallback(
    function (e) {
      e.stopPropagation();
      (async function () {
        setData(await fetch());
        onStartLoad();
        setLoad(true);
      })();
    },
    [fetch, onStartLoad]
  );

  const { name, status: state, count } = status;
  if ((!load || !data) && state === STORE_STATUS.ready) {
    return (
      <Button onClick={handleLoad} disabled={count > 0}>
        Load
      </Button>
    );
  }
  return (
    <BulkTaskProgress
      idbName={name}
      data={data}
      fields={fields}
      tokenize={tokenize}
      finished={function () {
        setLoad(false);
        onEndLoad();
      }}
    />
  );
}

function ActionClear({ name, version, disabled = false, refresh }) {
  const handleClear = useCallback(
    function (e) {
      e.stopPropagation();
      (async function () {
        await clearStore(await createStore(name, version));
        refresh();
      })();
    },
    [name, refresh, version]
  );
  return (
    <Button onClick={handleClear} disabled={disabled}>
      Clear
    </Button>
  );
}

function StoreManagerActions({ status, fields, fetch, refresh, tokenize }) {
  const [load, setLoad] = useState(false);
  const onStartLoad = function () {
    setLoad(true);
  };
  const onEndLoad = useCallback(
    function () {
      setLoad(false);
      refresh();
    },
    [refresh]
  );
  if (!status) {
    return null;
  }
  const { name, version } = status;
  return (
    <StoreManagerTitle title="ACTIONS">
      <div className="store-manager-actions-container">
        <ActionLoad
          tokenize={tokenize}
          status={status}
          fetch={fetch}
          fields={fields}
          onStartLoad={onStartLoad}
          onEndLoad={onEndLoad}
        />
        {load ? null : (
          <>
            <Separator />
            <ActionClear disabled={false} name={name} version={version} refresh={refresh} />
          </>
        )}
      </div>
    </StoreManagerTitle>
  );
}

export default StoreManagerActions;
