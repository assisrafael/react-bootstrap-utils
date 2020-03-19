import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from './Toast';
import { toastsDefaultStylesByPosition } from './toasts-helpers';

export function ToastsRegion({ name, className, toasts, noStyle }) {
  return (
    <div
      key={name}
      className={className}
      style={
        noStyle
          ? null
          : {
              position: 'fixed',
              zIndex: 9999,
              maxWidth: '50%',
              ...toastsDefaultStylesByPosition[name],
            }
      }
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

ToastsRegion.defaultProps = {
  toasts: [],
};

ToastsRegion.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  noStyle: PropTypes.bool,
  toasts: PropTypes.arrayOf(PropTypes.object),
};
