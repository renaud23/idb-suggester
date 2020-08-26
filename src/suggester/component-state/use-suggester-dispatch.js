import { useContext } from "react";
import SuggesterStateContext from "./suggester-state-context";

function useIt() {
  const { dispatch } = useContext(SuggesterStateContext);
  return dispatch;
}

export default useIt;
