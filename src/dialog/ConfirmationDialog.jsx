import React from 'react';
import PropTypes from 'prop-types';

import { awaitForAsyncTask, safeClick } from '../utils/event-handlers';
import { formatClasses } from '../utils/attributes';

import { Dialog, useDialog } from './Dialog';

export function useConfirmationDialog({ title, message, ...footerProps }) {
  const { showDialog, DialogPortal } = useDialog({
    title,
    body: message,
    // eslint-disable-next-line react/prop-types
    footer({ close }) {
      return <ConfirmationDialogFooter close={close} {...footerProps} />;
    },
  });

  return {
    showDialog,
    DialogPortal,
  };
}

export function ConfirmationDialog({ title, message, children, ...footerProps }) {
  return (
    <Dialog
      title={title}
      body={message}
      footer={({ close }) => <ConfirmationDialogFooter close={close} {...footerProps} />}
    >
      {children}
    </Dialog>
  );
}

ConfirmationDialog.defaultProps = {
  title: 'Atention required',
};

ConfirmationDialog.propTypes = {
  children: PropTypes.node,
  message: PropTypes.node,
  onCancel: PropTypes.func,
  onProceed: PropTypes.func,
  title: PropTypes.node,
  cancelLabel: PropTypes.node,
  proceedLabel: PropTypes.node,
  proceedType: PropTypes.oneOf(['primary', 'danger', 'success']),
};

function ConfirmationDialogFooter({ close, onProceed, onCancel, cancelLabel, proceedLabel, proceedType }) {
  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={safeClick(awaitForAsyncTask(onCancel, close))}>
        {cancelLabel}
      </button>
      <button
        type="button"
        className={formatClasses(['btn', `btn-${proceedType}`])}
        onClick={safeClick(awaitForAsyncTask(onProceed, close))}
      >
        {proceedLabel}
      </button>
    </>
  );
}
ConfirmationDialogFooter.defaultProps = {
  onProceed: () => {},
  onCancel: () => {},
  cancelLabel: 'Cancel',
  proceedLabel: 'Proceed',
  proceedType: 'primary',
};
ConfirmationDialogFooter.propTypes = {
  close: PropTypes.func,
  onCancel: PropTypes.func,
  onProceed: PropTypes.func,
  cancelLabel: PropTypes.node,
  proceedLabel: PropTypes.node,
  proceedType: PropTypes.oneOf(['primary', 'danger', 'success']),
};
