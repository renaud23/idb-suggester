import * as ACTIONS from "./actions";
import getDisplayValue from "../get-display-value";

function getInPayload(action, ...attrs) {
  const { payload } = action;
  return attrs.reduce(function (a, attr) {
    if (attr in payload) {
      return { ...a, [attr]: payload[attr] };
    }
    return a;
  }, {});
}

function reduceOnKeyDownInput(state) {
  const { suggestions, activeIndex } = state;
  if (suggestions.length) {
    return {
      ...state,
      displayActiveIndex: true,
      displayPanel: true,
      activeIndex: Math.min(activeIndex + 1, suggestions.length - 1),
    };
  }
  return state;
}

function reduceOnKeyUpInput(state) {
  const { activeIndex, suggestions } = state;
  if (suggestions.length) {
    return {
      ...state,
      displayActiveIndex: true,
      displayPanel: true,
      activeIndex: Math.max(activeIndex - 1, 0),
    };
  }
  return state;
}

function reduceOnBlurSuggester(state) {
  return {
    ...state,
    displayActiveIndex: false,
    displayPanel: false,
    focused: false,
  };
}

function reduceOnBlurInput(state) {
  return {
    ...state,
    focused: false,
  };
}

function reduceOnFocusedSuggester(state) {
  return {
    ...state,
    displayActiveIndex: false,
    displayPanel: true,
    focused: true,
  };
}

function reduceOnInputChange(state, action) {
  const { value, cursorPos } = getInPayload(action, "value", "cursorPos");

  return {
    ...state,
    displayActiveIndex: false,
    inputValue: value,
    activeIndex: -1,
    displayOnRefresh: true,
    cursorPos,
  };
}

function reduceOnRefreshSuggestions(state, action) {
  const { suggestions } = getInPayload(action, "suggestions");
  const { displayOnRefresh } = state;
  const displayPanel = displayOnRefresh && suggestions.length > 0;
  return {
    ...state,
    displayActiveIndex: false,
    suggestions,
    displayPanel,
    activeIndex: -1,
  };
}

function reduceOnMouseEnterOption(state, action) {
  const { index } = getInPayload(action, "index");
  return { ...state, displayActiveIndex: true, activeIndex: index };
}

function reduceOnMouseEnterInputLayer(state) {
  return { ...state, displayActiveIndex: false, activeIndex: -1 };
}

function reduceOnCLickDeleteButton(state) {
  return {
    ...state,
    displayIndex: -1,
    displayPanel: false,
    suggestions: [],
    activeInde: -1,
    displayActiveIndex: false,
    selectedItem: undefined,
    inputValue: "",
    displayOnRefresh: false,
  };
}

function reduceOnEnterInput(state) {
  const { activeIndex, suggestions } = state;
  if (activeIndex >= 0) {
    const inputValue = getDisplayValue(state);
    return {
      ...state,
      displayIndex: -1,
      displayPanel: false,
      displayActiveIndex: false,
      selectedItem: suggestions[activeIndex],
      inputValue,
      focused: true,
      displayOnRefresh: false,
    };
  }
  return state;
}

function reduceOnClickOption(state) {
  return reduceOnEnterInput(state);
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INPUT_CHANGE:
      return reduceOnInputChange(state, action);
    case ACTIONS.ON_REFRESH_SUGGESTIONS:
      return reduceOnRefreshSuggestions(state, action);
    case ACTIONS.ON_BLUR_SUGGESTER:
      return reduceOnBlurSuggester(state);
    case ACTIONS.ON_FOCUSED_SUGGESTER:
      return reduceOnFocusedSuggester(state);
    case ACTIONS.ON_ARROW_UP_INPUT:
      return reduceOnKeyUpInput(state);
    case ACTIONS.ON_ARROW_DOWN_INPUT:
      return reduceOnKeyDownInput(state);
    case ACTIONS.ON_MOUSE_ENTER_OPTION:
      return reduceOnMouseEnterOption(state, action);
    case ACTIONS.ON_MOUSE_ENTER_INPUT_LAYER:
      return reduceOnMouseEnterInputLayer(state);
    case ACTIONS.ON_ENTER_INPUT:
      return reduceOnEnterInput(state);
    case ACTIONS.ON_CLICK_OPTION:
      return reduceOnClickOption(state);
    case ACTIONS.ON_CLICK_DELETE_BUTTON:
      return reduceOnCLickDeleteButton(state);
    case ACTIONS.ON_BLUR_INPUT:
      return reduceOnBlurInput(state);
    default:
      return state;
  }
}

export default reducer;
