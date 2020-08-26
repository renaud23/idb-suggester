import React from "react";
import { useSuggesterState, onMouseEnterInputLayer } from "./component-state";
import getValue from "./get-display-value";

function InputLayer() {
  const [state, dispatch] = useSuggesterState();
  const { displayActiveIndex } = state;
  if (displayActiveIndex) {
    return (
      <div
        className="renaud-suggester-input-layer"
        onMouseMove={function (e) {
          e.stopPropagation();
          dispatch(onMouseEnterInputLayer());
        }}
      >
        {getValue(state)}
      </div>
    );
  }
  return null;
}

export default InputLayer;
