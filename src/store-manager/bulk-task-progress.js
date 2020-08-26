import React, { useEffect, useState, useRef } from 'react';
import { BULK_INSERT_MESSAGES } from '../store-index';
import createWorker from '../worker/bulk-insert';
import './bulk-insert-progress.scss';

async function loadTask(data, idbName, fields, tokenize, process = () => null) {
  if (idbName) {
    const bulkTask = createWorker(process);
    bulkTask(idbName, fields, data, tokenize);
  }
}

export function BulkTaskProgress({
  idbName,
  data = [],
  fields = [],
  finished = () => null,
  tokenize = false,
}) {
  const ref = useRef();
  const [statusWidth, setStatusWidth] = useState(0);
  const [nbToLoad] = useState(data.length);
  const [complete, setComplete] = useState(false);
  const [nbTreated, setNbTreated] = useState(0);

  useEffect(
    function () {
      if (ref.current) {
        setStatusWidth(ref.current.clientWidth);
      }
    },
    [ref]
  );

  useEffect(
    function () {
      function callback(args) {
        const { message } = args;
        switch (message) {
          case BULK_INSERT_MESSAGES.complete: {
            const { treated } = args;
            setNbTreated(treated);
            break;
          }
          case BULK_INSERT_MESSAGES.finished:
            setComplete(true);
            finished();
            break;
          case BULK_INSERT_MESSAGES.error:
          default:
        }
      }
      loadTask(data, idbName, fields, tokenize, callback);
    },
    [data, idbName, fields, finished, tokenize]
  );

  const percent = nbTreated / (nbToLoad + 1);
  const width = Math.trunc(statusWidth * percent) - 1;
  const status = complete ? '100 %' : `${Math.trunc(percent * 100)} %`;
  return (
    <div className="bulk-insert-progress" ref={ref}>
      <span className="progress" style={{ width }} />
      <span className="status">{status}</span>
    </div>
  );
}

export default BulkTaskProgress;
