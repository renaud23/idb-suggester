function onSelect(state) {
  const { onSelect, suggestions, activeIndex } = state;
  if (activeIndex >= 0) {
    onSelect(suggestions[activeIndex]);
  }
}

export default onSelect;
