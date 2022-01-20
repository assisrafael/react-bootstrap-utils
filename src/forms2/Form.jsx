import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useFormHelper, FormContext } from './helpers/useFormHelper';
import { FormActions } from './FormActions';

export function Form2({
  cancelLabel,
  children,
  customActions,
  customValidation,
  debounceWait,
  initialValues,
  onCancel,
  onChange,
  onSubmit,
  submitLabel,
  validations,
  transform,
}) {
  const formHelper = useFormHelper(initialValues, { debounceWait, transform, onChange, validations });
  const formRef = useRef(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const resetForm = useCallback(() => {
    if (formRef.current && formRef.current.classList) {
      formRef.current.classList.remove('was-validated');
    }

    formHelper.reset();
  }, [formHelper]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      formHelper.setSubmitedAttempted();

      if (customValidation && !formRef.current.checkValidity()) {
        formRef.current.classList.add('was-validated');

        return;
      }

      setIsSubmiting(true);

      const submitResponse = onSubmit(formHelper.getFormData(), resetForm);

      let submitPromise = Promise.resolve();

      if (submitResponse && submitResponse.then) {
        submitPromise = submitResponse.then(() => {
          resetForm();
        });
      }

      submitPromise.finally(() => {
        setIsSubmiting(false);
      });
    },
    [customValidation, formHelper, onSubmit, resetForm]
  );

  function handleCancel() {
    onCancel(resetForm);
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
      <FormContext.Provider value={formHelper}>{children}</FormContext.Provider>
      <FormActions {...{ submitLabel, cancelLabel, onCancel: handleCancel, isSubmiting, customActions }} />
    </form>
  );
}

Form2.defaultProps = {
  cancelLabel: 'Cancel',
  customValidation: false,
  debounceWait: 500,
  onChange: () => {},
  submitLabel: 'Submit',
};

Form2.propTypes = {
  cancelLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  customActions: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  customValidation: PropTypes.bool,
  debounceWait: PropTypes.number,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  transform: PropTypes.func,
  validations: PropTypes.object,
};
