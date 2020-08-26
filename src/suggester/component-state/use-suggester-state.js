import { useContext } from "react";
import SuggesterStateContext from "./suggester-state-context";

function useSuggesterState() {
  const { state, dispatch } = useContext(SuggesterStateContext);
  return [state, dispatch];
}

export default useSuggesterState;
