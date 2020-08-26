import React from "react";

const SuggesterStateContext = React.createContext({
  state: {},
  dispatch: () => null,
});

SuggesterStateContext.displayName = "SuggesterContext";

export default SuggesterStateContext;
