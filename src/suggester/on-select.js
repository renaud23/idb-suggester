function onSelect(state) {
  const { onSelect, suggestions, activeIndex, inputValue } = state;
  if (activeIndex >= 0) {
    onSelect(suggestions[activeIndex], suggestions, inputValue);
  }
}

export default onSelect;
