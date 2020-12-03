import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { formatClasses } from '../utils/attributes';

import { ToastsContext } from './toasts-helpers';

export function Toast({ id, type, message, closeControl, position, noStyle }) {
  const toastsState = useContext(ToastsContext);

  return (
    <div
      className={formatClasses(['toast-message', 'alert', `alert-${type}`, closeControl && 'alert-dismissible'])}
      style={noStyle ? null : { width: 'auto', zIndex: 9999 }}
    >
      {message}

      {closeControl && (
        <button type="button" className="close" onClick={() => toastsState.close(position, id)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}

Toast.propTypes = {
  closeControl: PropTypes.bool,
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  noStyle: PropTypes.bool,
  position: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
