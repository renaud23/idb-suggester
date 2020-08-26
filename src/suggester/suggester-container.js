import React from "react";
import { useSuggesterState } from "./component-state";
import classnames from "classnames";

export default React.forwardRef(function SuggesterContainer({ children }, ref) {
  const [state] = useSuggesterState();
  const { focused } = state;
  return (
    <div
      className={classnames("renaud-suggester-container", {
        focused,
        unfocused: !focused,
      })}
      ref={ref}
    >
      <div className="renaud-suggester">{children}</div>
    </div>
  );
});
