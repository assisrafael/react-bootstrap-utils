import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from './Dialog';
import { awaitForAsyncTask, safeClick } from '../utils/event-handlers';
import { formatClasses } from '../utils/attributes';

export function ConfirmationDialog({
  title,
  message,
  children,
  onProceed,
  onCancel,
  cancelLabel,
  proceedLabel,
  proceedType,
}) {
  return (
    <Dialog
      title={title}
      body={message}
      footer={({ close }) => (
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
      )}
    >
      {children}
    </Dialog>
  );
}

ConfirmationDialog.defaultProps = {
  onProceed: () => {},
  onCancel: () => {},
  title: 'Atention required',
  cancelLabel: 'Cancel',
  proceedLabel: 'Proceed',
  proceedType: 'primary',
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
