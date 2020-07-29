import React from 'react';
import PropTypes from 'prop-types';
import { ToastsContext, toastPositions } from './toasts-helpers';
import { ToastsRegion } from './ToastsRegion';
import { useToast } from './useToast';

export function ToastsContainer({ children, unique, noStyle }) {
  const toastsState = useToast({ unique });

  return (
    <ToastsContext.Provider value={toastsState}>
      {children}

      <div className="toast-container">
        {toastPositions.map(({ name, className }) => (
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
