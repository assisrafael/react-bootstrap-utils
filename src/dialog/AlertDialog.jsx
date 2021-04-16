import React from 'react';
import PropTypes from 'prop-types';

import { awaitForAsyncTask } from '../utils/event-handlers';

import { Dialog, useDialog } from './Dialog';

export function useAlertDialog({ title, message, ...footerProps }) {
  const { showDialog, DialogPortal } = useDialog({
    title,
    body: message,
    // eslint-disable-next-line react/prop-types
    footer({ close }) {
      return <AlertDialogFooter close={close} {...footerProps} />;
    },
  });

  return {
    showDialog,
    DialogPortal,
  };
}

export function AlertDialog({ title, message, children, onClose, closeLabel }) {
  return (
    <Dialog
      title={title}
      body={message}
      footer={({ close }) => <AlertDialogFooter close={close} onClose={onClose} closeLabel={closeLabel} />}
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

function AlertDialogFooter({ close, onClose, closeLabel }) {
  return (
    <button type="button" className="btn btn-primary" onClick={awaitForAsyncTask(onClose, close)}>
      {closeLabel}
    </button>
  );
}
AlertDialogFooter.defaultProps = {
  onClose: () => {},
  closeLabel: 'Close',
};

AlertDialogFooter.propTypes = {
  close: PropTypes.func,
  onClose: PropTypes.func,
  closeLabel: PropTypes.node,
};
