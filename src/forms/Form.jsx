import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './form-helpers';
import { useForm } from './useForm';
import { FormActions } from './FormActions';

export function Form({
  cancelLabel,
  children,
  customValidation,
  initialValues,
  onCancel,
  onSubmit,
  submitLabel,
  validations,
}) {
  const formState = useForm(initialValues, validations);
  const formRef = useRef(null);

  function resetForm() {
    formRef.current.classList.remove('was-validated');
    formState.reset();
  }

  function handleSubmit(e) {
    e.preventDefault();

    formState.setSubmitedAttempted();

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
  cancelLabel: 'Cancel',
  customValidation: false,
  submitLabel: 'Submit',
};

Form.propTypes = {
  cancelLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  customValidation: PropTypes.bool,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  validations: PropTypes.object,
};
