import React from "react";

function StoreManagerTitle({ title, children }) {
  return (
    <>
      <div className="store-manager-title">{title}</div>
      {children}
    </>
  );
}

export default StoreManagerTitle;
