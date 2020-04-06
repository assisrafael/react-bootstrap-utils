import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './helpers/form-helpers';
import { useForm } from './helpers/useForm';
import { FormActions } from './FormActions';

export function Form({
  cancelLabel,
  children,
  customValidation,
  customActions,
  initialValues,
  onCancel,
  onSubmit,
  onChange,
  submitLabel,
  validations,
}) {
  const formState = useForm(initialValues, validations, onChange);
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

      {customActions || <FormActions {...{ submitLabel, cancelLabel, onCancel: handleCancel }} />}
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  customValidation: PropTypes.bool,
  customActions: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  submitLabel: PropTypes.string,
  validations: PropTypes.object,
};
