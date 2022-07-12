import React, { useEffect, useRef, useState } from 'react';
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
  transform,
}) {
  const formState = useForm(initialValues, { validations, onChange, transform });
  const formRef = useRef(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  function resetForm() {
    if (formRef.current && formRef.current.classList) {
      formRef.current.classList.remove('was-validated');
    }

    formState.reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    formState.setSubmitedAttempted();

    if (customValidation && !formRef.current.checkValidity()) {
      formRef.current.classList.add('was-validated');

      return;
    }

    setIsSubmiting(true);
    const submitResponse = onSubmit(formState.getFormData(), resetForm);

    let submitPromise = Promise.resolve();

    if (submitResponse && submitResponse.then) {
      submitPromise = submitResponse.then(() => {
        resetForm();
      });
    }

    submitPromise.finally(() => {
      setIsSubmiting(false);
    });
  }

  function handleCancel() {
    //TODO: improve cancel options
    onCancel(resetForm);
  }

  const formProps = {
    ref: formRef,
    onSubmit: handleSubmit,
  };

  if (customValidation) {
    formProps.noValidate = true;
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      setIsSubmiting(false)
    };
  }, []);

  return (
    <form {...formProps}>
      <FormContext.Provider value={formState}>{children}</FormContext.Provider>

      <FormActions {...{ submitLabel, cancelLabel, onCancel: handleCancel, isSubmiting, customActions }} />
    </form>
  );
}

Form.defaultProps = {
  cancelLabel: 'Cancel',
  customValidation: false,
  submitLabel: 'Submit',
  onChange: () => {},
  transform: (data) => data,
};

Form.propTypes = {
  cancelLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  customActions: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  customValidation: PropTypes.bool,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  transform: PropTypes.func,
  validations: PropTypes.object,
};
