import React, { useCallback } from "react";
import classnames from "classnames";
import {
  useSuggesterState,
  onMouseEnterOption,
  onClickOption,
} from "./component-state";
import onSelect from "./on-select";

function OptionContainer({ children, index }) {
  const [state, dispatch] = useSuggesterState();
  const { activeIndex, selectedItem, suggestions } = state;
  const active = index === activeIndex;
  const selected =
    selectedItem && selectedItem.id === suggestions[index].id ? true : false;

  const handleMouseEnter = useCallback(
    function (e) {
      e.stopPropagation();
      e.preventDefault();
      dispatch(onMouseEnterOption(index));
    },
    [index, dispatch]
  );

  return (
    <li
      className={classnames("renaud-suggestion-option", { active, selected })}
      onClick={function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button === 0) {
          onSelect(state);
          dispatch(onClickOption());
        }
      }}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </li>
  );
}

OptionContainer.defaultProps = {
  onSelect: () => null,
};

export default OptionContainer;
