import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../utils/types';

export function FormActions({ submitLabel, cancelLabel, onCancel, isSubmiting, customActions }) {
  if (customActions) {
    return isFunction(customActions) ? customActions(isSubmiting) : customActions;
  }

  return (
    <div className="form-actions">
      <button type="submit" className="btn btn-primary mr-1" disabled={isSubmiting}>
        {isFunction(submitLabel) ? submitLabel(isSubmiting) : submitLabel}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSubmiting}>
        {cancelLabel}
        {isFunction(cancelLabel) ? cancelLabel(isSubmiting) : cancelLabel}
      </button>
    </div>
  );
}

FormActions.propTypes = {
  submitLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  cancelLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  onCancel: PropTypes.func.isRequired,
  isSubmiting: PropTypes.bool,
  customActions: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
