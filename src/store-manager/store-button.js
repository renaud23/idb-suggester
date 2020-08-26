import React from "react";
import classnames from "classnames";

function Button({ onClick = () => null, children, disabled = false }) {
  return (
    <button
      className={classnames("store-button", { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </button>
  );
}

export default Button;
