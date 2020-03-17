import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from './Dialog';
import { handleClick } from './modal-helpers';

export function AlertDialog({ title, message, children, onClose, closeLabel }) {
  return (
    <Dialog
      title={title}
      body={message}
      footer={({ close }) => (
        <button type="button" className="btn btn-primary" onClick={handleClick(onClose, close)}>
          {closeLabel}
        </button>
      )}
    >
      {children}
    </Dialog>
  );
}

AlertDialog.defaultProps = {
  onClose: () => {},
  title: 'Atention required',
  closeLabel: 'Close',
};

AlertDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  closeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
