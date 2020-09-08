import React from 'react';

export function SearchIconDefault({ width = 20, height = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 513.28 513.28"
      x="0"
      y="0"
    >
      <g>
        <g>
          <path d="M495.04 404.48L410.56 320c15.36-30.72 25.6-66.56 25.6-102.4C436.16 97.28 338.88 0 218.56 0S.96 97.28.96 217.6s97.28 217.6 217.6 217.6c35.84 0 71.68-10.24 102.4-25.6l84.48 84.48c25.6 25.6 64 25.6 89.6 0 23.04-25.6 23.04-64 0-89.6zM218.56 384c-92.16 0-166.4-74.24-166.4-166.4S126.4 51.2 218.56 51.2s166.4 74.24 166.4 166.4S310.72 384 218.56 384z"></path>
        </g>
      </g>
    </svg>
  );
}

function SearchIcon({ component: Component }) {
  if (Component) {
    return (
      <div className="search-icon">
        <Component />
      </div>
    );
  }
  return null;
}

export default SearchIcon;
