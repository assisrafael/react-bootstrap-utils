import React from 'react';
import PropTypes from 'prop-types';

import { ToastsContext, TOASTS_CLASSNAME_BY_POSITION } from './toasts-helpers';
import { ToastsRegion } from './ToastsRegion';
import { useToastState } from './useToastState';

export function ToastsContainer({ children, unique, noStyle }) {
  const toastsState = useToastState({ unique });

  return (
    <ToastsContext.Provider value={toastsState}>
      {children}

      <div className="toast-container">
        {TOASTS_CLASSNAME_BY_POSITION.map(({ name, className }) => (
          <ToastsRegion key={name} name={name} className={className} toasts={toastsState.get(name)} noStyle={noStyle} />
        ))}
      </div>
    </ToastsContext.Provider>
  );
}

ToastsContainer.defaultProps = {
  noStyle: false,
  unique: true,
};

ToastsContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  noStyle: PropTypes.bool,
  unique: PropTypes.bool,
};
