import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from './Dialog';
import { awaitForAsyncTask } from '../utils/event-handlers';

export function AlertDialog({ title, message, children, onClose, closeLabel }) {
  return (
    <Dialog
      title={title}
      body={message}
      footer={({ close }) => (
        <button type="button" className="btn btn-primary" onClick={awaitForAsyncTask(onClose, close)}>
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
  children: PropTypes.node,
  message: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.node,
  closeLabel: PropTypes.node,
};
