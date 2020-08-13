import { useContext, useCallback } from 'react';
import { FormContext } from './form-helpers';
import { toDatetimeLocal, fromDatetimeLocal } from '../../utils/formatters';
import { isNull } from '../../utils/types';

export function useFormControl(name, type) {
  const formState = useContext(FormContext);

  function setValue(value) {
    formState.update(name, value);
  }

  const register = useCallback(
    (ref) => {
      formState.register(name, ref);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  return {
    getValue: () => encode(formState.getValue(name), type),
    setValue,
    handleOnChange: ({ target }, _type) => {
      const value = getTargetValue(target);

      const decodedValue = decode(value, type || _type);

      setValue(decodedValue);
    },
    register,
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

function encode(value, type) {
  if (typeof value === 'undefined' || isNull(value)) {
    return getEmptyValue(type);
  }

  if (type === 'datetime-local') {
    return toDatetimeLocal(value);
  }

  if (type === 'number' && isNaN(value)) {
    return;
  }

  return value;
}

function decode(value, type) {
  if (type === 'number') {
    return parseFloat(value);
  }

  if (type === 'boolean') {
    return value === 'true';
  }

  return value;
}

function getTargetValue(target) {
  let value = target.type === 'checkbox' ? target.checked : target.value;

  if (target.type === 'number') {
    value = target.valueAsNumber;
    if (isNaN(value)) {
      value = undefined;
    }
  }

  if (target.type === 'datetime-local') {
    value = fromDatetimeLocal(target.value);
  }

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

  return value;
}
