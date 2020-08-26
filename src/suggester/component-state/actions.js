export const ON_REFRESH_SUGGESTIONS = "renaud-suggester/onRefreshSuggestions";
export const onRefreshSuggestions = (suggestions) => ({
  type: ON_REFRESH_SUGGESTIONS,
  payload: { suggestions },
});

export const ON_BLUR_SUGGESTER = "renaud-suggester/onBlurSuggester";
export const onBlurSuggester = () => ({ type: ON_BLUR_SUGGESTER });

export const ON_FOCUSED_SUGGESTER = "renaud-suggester/onFocusedSuggester";
export const onFocusedSuggester = () => ({ type: ON_FOCUSED_SUGGESTER });

/**
 *
 */

export const ON_INPUT_CHANGE = "renaud-suggester/onInputChange";
export const onInputChange = (value, cursorPos) => ({
  type: ON_INPUT_CHANGE,
  payload: { value, cursorPos },
});

export const ON_ARROW_UP_INPUT = "renaud-suggester/onArrowUpInput";
export const onArrowUpInput = () => ({ type: ON_ARROW_UP_INPUT });

export const ON_ARROW_DOWN_INPUT = "renaud-suggester/onArrowDownInput";
export const onArrowDownInput = () => ({ type: ON_ARROW_DOWN_INPUT });

export const ON_ENTER_INPUT = "renaud-suggester/onEnterInput";
export const onEnterInput = () => ({ type: ON_ENTER_INPUT });

export const ON_BLUR_INPUT = "renaud-suggester/onBlurInput";
export const onBlurInput = () => ({ type: ON_BLUR_INPUT });

/**
 *
 */

export const ON_CLICK_OPTION = "renaud-suggester/onClickOption";
export const onClickOption = () => ({
  type: ON_CLICK_OPTION,
});

export const ON_MOUSE_ENTER_OPTION = "renaud-suggester/onMouseEnterOption";
export const onMouseEnterOption = (index) => ({
  type: ON_MOUSE_ENTER_OPTION,
  payload: { index },
});

/**
 *
 */
export const ON_MOUSE_ENTER_INPUT_LAYER =
  "renaud-suggester/onMouseEnterInputLayer";
export const onMouseEnterInputLayer = () => ({
  type: ON_MOUSE_ENTER_INPUT_LAYER,
});

/**
 *
 */
export const ON_CLICK_DELETE_BUTTON = "renaud-suggester/onClickDeleteButton";
export const onClickDeleteButton = () => ({ type: ON_CLICK_DELETE_BUTTON });
