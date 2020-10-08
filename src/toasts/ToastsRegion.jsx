import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from './Toast';
import { TOASTS_DEFAULT_STYLES_BY_POSITION, TOASTS_DEFAULT_STYLE } from './toasts-helpers';

export function ToastsRegion({ name, className, toasts, noStyle }) {
  return (
    <div
      key={name}
      className={className}
      style={
        noStyle
          ? null
          : {
              ...TOASTS_DEFAULT_STYLE,
              ...TOASTS_DEFAULT_STYLES_BY_POSITION[name],
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
