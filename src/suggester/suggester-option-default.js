import React from "react";

function Option({ suggestion }) {
  const { id } = suggestion;
  return <span>{id}</span>;
}

export default Option;
