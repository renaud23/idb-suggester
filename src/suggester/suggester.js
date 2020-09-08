import React, { useEffect, useReducer, useRef, useMemo, useState } from 'react';
import SuggesterContainer from './suggester-container';
import { searchByPrefix, searchByTokens, SEARCH_TYPES, ID_STORE_IDENTIFIER } from '../store-index';
import PropTypes from 'prop-types';
import Input from './suggester-input';
import Panel from './suggester-panel';
import OptionDefault from './suggester-option-default';
import {
  reducer,
  initialState,
  SuggesterStateContext,
  onRefreshSuggestions,
  onBlurSuggester,
} from './component-state';
import SearchIcon from './search.icon';

async function refreshSuggestion(prefix, searching, how) {
  if (prefix.trim().length) {
    return await searching(prefix, how);
  } else {
    return [];
  }
}

function getSearch(type) {
  return type === SEARCH_TYPES.tokens ? searchByTokens : searchByPrefix;
}

function Suggester({
  store,
  optionComponent,
  displayPath,
  onSelect,
  how,
  searchType,
  fields,
  placeHolder,
  language,
  className,
  theme,
  searchIcon,
}) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    onSelect,
    displayPath,
    placeHolder,
  });
  const [context, setContext] = useState({
    dispatch,
    state,
  });
  const { inputValue } = state;

  const searching = useMemo(() => getSearch(searchType)(store, fields, language), [
    fields,
    store,
    searchType,
    language,
  ]);

  useEffect(
    function () {
      async function doRefresh() {
        if (typeof searching === 'function') {
          const suggestions = await refreshSuggestion(inputValue, searching, how);
          dispatch(onRefreshSuggestions(suggestions));
        }
      }

      doRefresh();
    },
    [inputValue, searching, how]
  );
  useEffect(
    function () {
      setContext({ dispatch, state });
    },
    [dispatch, state]
  );

  useEffect(
    function () {
      async function change() {
        return await import(`./themes/${theme}.scss`);
      }
      if (theme) {
        change();
      }
    },
    [theme]
  );

  useEffect(
    function () {
      function handleClickBody(e) {
        if (containerEl.current) {
          if (!containerEl.current.contains(e.target)) {
            dispatch(onBlurSuggester());
          }
        }
      }
      document.body.addEventListener('click', handleClickBody);
      return function () {
        document.body.removeEventListener('click', handleClickBody);
      };
    },
    [containerEl]
  );
  return (
    <SuggesterStateContext.Provider value={context}>
      <SuggesterContainer ref={containerEl} className={className}>
        <div className="search-icon">
          <SearchIcon component={searchIcon} />
        </div>
        <Input />
        <Panel optionComponent={optionComponent} />
      </SuggesterContainer>
    </SuggesterStateContext.Provider>
  );
}

Suggester.defaultProps = {
  optionComponent: OptionDefault,
  displayPath: 'id',
  how: 15,
  searchType: SEARCH_TYPES.prefix,
  placeHolder: 'Search...',
  language: 'French',
  searchIcon: undefined,
};

Suggester.propTypes = {
  store: function (props, propName, componentName) {
    if (!(propName in props)) {
      return new Error('Store is required !');
    }
    const { id } = props[propName];
    if (!id || id !== ID_STORE_IDENTIFIER) {
      return new Error('Not a valid store !');
    }
  },
  // optional
  optionComponent: PropTypes.elementType,
  searchIcon: PropTypes.elementType,
  how: PropTypes.number,
  displayPath: PropTypes.string,
  placeHolder: PropTypes.string,
  language: PropTypes.string,
  className: PropTypes.string,
};

export default Suggester;
