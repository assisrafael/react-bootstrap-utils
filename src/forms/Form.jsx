import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormContext, useForm } from './form-helpers';
import { FormActions } from './FormActions';

export function Form({ children, initialValues, onSubmit, submitLabel, cancelLabel, onCancel, customValidation }) {
  const formState = useForm(initialValues);
  const formRef = useRef(null);

  function resetForm() {
    formRef.current.classList.remove('was-validated');
    formState.reset();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (customValidation && !formRef.current.checkValidity()) {
      formRef.current.classList.add('was-validated');
      return;
    }

    const res = onSubmit(formState.getFormData(), resetForm);

    if (res && res.then) {
      res.then(resetForm);
    }
  }

  function handleCancel() {
    //TODO: improve cancel options
    onCancel();
  }

  const formProps = {
    ref: formRef,
    onSubmit: handleSubmit,
  };

  if (customValidation) {
    formProps.noValidate = true;
  }

  return (
    <form {...formProps}>
      <FormContext.Provider value={formState}>{children}</FormContext.Provider>

      <FormActions {...{ submitLabel, cancelLabel, onCancel: handleCancel }} />
    </form>
  );
}

Form.defaultProps = {
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
  customValidation: true,
};

Form.propTypes = {
  cancelLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  customValidation: PropTypes.bool,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};
