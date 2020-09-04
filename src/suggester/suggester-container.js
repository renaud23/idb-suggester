import React from 'react';
import { useSuggesterState } from './component-state';
import classnames from 'classnames';

export default React.forwardRef(function SuggesterContainer({ children, className }, ref) {
  const [state] = useSuggesterState();
  const { focused } = state;
  return (
    <div
      className={classnames('idb-suggester-container', className, {
        focused,
        unfocused: !focused,
      })}
      ref={ref}
    >
      <div className={classnames('idb-suggester', { focused, unfocused: !focused })}>
        {children}
      </div>
    </div>
  );
});
