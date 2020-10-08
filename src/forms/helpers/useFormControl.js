import { useContext } from 'react';
import { FormContext } from './form-helpers';

export function useFormControl(name, type, afterChange) {
  const formState = useContext(FormContext);

  function setValue(value) {
    formState.update(name, value);
  }

  return {
    getValue: () => formState.getValue(name) || getEmptyValue(type),
    setValue,
    handleOnChange: ({ target }) => {
      const value = target.type === 'checkbox' ? target.checked : target.value;

      setValue(value);

      if (afterChange && typeof afterChange === 'function') {
        afterChange(value);
      }
    },
    register: (ref) => {
      formState.register(name, ref);
    },
    getFormData: () => formState.getFormData(),
    isValid: () => formState.getValidationMessage(name) === '',
    getFormSubmitedAttempted: () => formState.getSubmitedAttempted(),
  };
}

function getEmptyValue(type) {
  switch (type) {
    case 'boolean':
      return false;

    default:
      return '';
  }
}
