import React from "react";
import DeleteIcon from "./delete.icon";
import { onClickDeleteButton, useSuggesterDispatch } from "./component-state";

function SuggesterButtonDelete() {
  const dispatch = useSuggesterDispatch();
  return (
    <div
      className="renaud-suggester-button-delete"
      tabIndex="0"
      onClick={function (e) {
        dispatch(onClickDeleteButton());
      }}
    >
      <DeleteIcon width={10} height={10} />
    </div>
  );
}

export default SuggesterButtonDelete;
