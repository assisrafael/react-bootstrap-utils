import { useContext } from 'react';
import { FormContext } from './form-helpers';

export function useFormControl(name, type) {
  const formState = useContext(FormContext);

  function setValue(value) {
    formState.update(name, value);
  }

  return {
    getValue: () => formState.getValue(name) || getEmptyValue(type),
    setValue,
    handleOnChange: ({ target }) => {
      let value = target.type === 'checkbox' ? target.checked : target.value;

      if (target.type === 'select-one') {
        if (value && ['{', '['].includes(value[0])) {
          try {
            value = JSON.parse(value);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }
      }

      setValue(value);
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

    case 'array':
      return [];

    default:
      return '';
  }
}
