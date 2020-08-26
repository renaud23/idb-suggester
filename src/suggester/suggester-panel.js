import React from "react";
import OptionContainer from "./suggester-option-container";
import { useSuggesterState } from "./component-state";
import classnames from "classnames";

function PanelContent({ suggestions, optionComponent: Component, display }) {
  if (display) {
    return (
      <ul className={classnames("renaud-suggester-panel")}>
        {suggestions.map(function (s, i) {
          const { id } = s;
          return (
            <OptionContainer key={id} item={s} index={i}>
              <Component suggestion={s} />
            </OptionContainer>
          );
        })}
      </ul>
    );
  }
  return null;
}

function Panel({ optionComponent }) {
  const [state] = useSuggesterState();
  const { suggestions, displayPanel } = state;
  const length = suggestions.length;
  if (!length) {
    return null;
  }

  return (
    <div
      className={classnames("renaud-suggester-panel-container", {
        display: displayPanel,
        hide: !displayPanel,
      })}
    >
      <PanelContent
        suggestions={suggestions}
        optionComponent={optionComponent}
        display={displayPanel}
      />
    </div>
  );
}

export default Panel;
