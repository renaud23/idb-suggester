import React, { useRef, useEffect } from "react";
import classnames from "classnames";
import InputLayer from "./suggester-input-layer";
import {
  useSuggesterState,
  onInputChange,
  onFocusedSuggester,
  onArrowDownInput,
  onArrowUpInput,
  onEnterInput,
  onBlurInput,
  onBlurSuggester,
} from "./component-state";
import SuggesterButtonDelete from "./suggester-button-delete";
import onSelect from "./on-select";

const KEY_BIND = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
  tab: "Tab",
  enter: "Enter",
};

function Input() {
  const [state, dispatch] = useSuggesterState();
  const { focused, inputValue, placeHolder, cursorPos } = state;
  const inputEl = useRef();
  function handleKeyPressed(e) {
    e.stopPropagation();
    const { key } = e;
    switch (key) {
      case KEY_BIND.arrowUp:
        e.preventDefault();
        dispatch(onArrowUpInput());
        break;
      case KEY_BIND.arrowDown:
        e.preventDefault();
        dispatch(onArrowDownInput());
        break;
      case KEY_BIND.enter:
        onSelect(state);
        dispatch(onEnterInput());
        break;
      case KEY_BIND.tab:
        dispatch(onBlurSuggester());
        break;
      default:
    }
  }

  useEffect(
    function () {
      if (inputEl.current) {
        const where = inputEl.current.selectionStart;
        if (cursorPos !== where) {
          if (typeof inputEl.current.setSelectionRange === "function") {
            inputEl.current.setSelectionRange(cursorPos, cursorPos);
          }
          // TODO for oldest nav
        }
      }
    },
    [inputEl, cursorPos]
  );

  return (
    <div
      className={classnames("renaud-suggester-input-container", { focused })}
    >
      <input
        type="text"
        ref={inputEl}
        autoComplete="list"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeHolder}
        onChange={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onInputChange(e.target.value, e.target.selectionStart));
        }}
        value={inputValue}
        className="renaud-suggester-input"
        onFocus={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onFocusedSuggester());
        }}
        onBlur={function (e) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(onBlurInput());
        }}
        onKeyDown={handleKeyPressed}
      />
      <InputLayer />
      <SuggesterButtonDelete />
    </div>
  );
}

export default Input;
