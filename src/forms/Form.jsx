import React from 'react';
import PropTypes from 'prop-types';
import { FormContext, useForm } from './form-helpers';

export function Form({ children, initialValues, onSubmit, submitLabel, cancelLabel, onCancel }) {
  const formState = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();

    const res = onSubmit(formState.getFormData(), () => formState.reset());

    if (res && res.then) {
      res.then(() => {
        formState.reset();
      });
    }
  }

  function handleCancel() {
    //TODO: improve cancel options
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <code>{JSON.stringify(formState.getFormData(), '', ' ')}</code>
      <FormContext.Provider value={formState}>{children}</FormContext.Provider>

      <FormActions {...{ submitLabel, cancelLabel, onCancel: handleCancel }} />
    </form>
  );
}

Form.defaultProps = {
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
};

Form.propTypes = {
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

function FormActions({ submitLabel, cancelLabel, onCancel }) {
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
