import React from 'react';
import StoreManagerTitle from './store-manager-title';

function Info({ label, children }) {
  return (
    <div className="store-status-info">
      <span className="label">{label}</span>
      <span className="value">{children}</span>
    </div>
  );
}

function StoreStatus({ status }) {
  if (!status) {
    return null;
  }

  const { count, status: state, name, version } = status;
  return (
    <StoreManagerTitle title="STATUS">
      <div className="store-status">
        <Info label="NAME">{name}</Info>
        <Info label="VERSION">{version}</Info>
        <Info label="COUNT">{count || '-'}</Info>
        <Info label="STATUS">{state}</Info>
      </div>
    </StoreManagerTitle>
  );
}

export default StoreStatus;
