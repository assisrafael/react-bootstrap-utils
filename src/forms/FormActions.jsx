import React from 'react';
import PropTypes from 'prop-types';

export function FormActions({ submitLabel, cancelLabel, onCancel }) {
  return (
    <div className="form-actions">
      <button type="submit" className="btn btn-primary mr-1">
        {submitLabel}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        {cancelLabel}
      </button>
    </div>
  );
}

FormActions.propTypes = {
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};
