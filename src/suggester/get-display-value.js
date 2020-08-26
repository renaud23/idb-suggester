function getValue(state) {
  const { activeIndex, suggestions, displayPath } = state;
  const item = suggestions[activeIndex];

  if (displayPath in item) {
    return item[displayPath];
  }
  const { id } = item;
  return id;
}

export default getValue;
