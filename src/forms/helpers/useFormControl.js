import { useContext, useCallback } from 'react';
import { isEmptyStringLike, isBoolean, isFunction } from 'js-var-type';
import { FormContext } from './form-helpers';
import { toDatetimeLocal, fromDatetimeLocal } from '../../utils/formatters';

export function useFormControl(name, type) {
  const formState = useContext(FormContext);

  const setValue = useCallback(
    (value) => {
      formState.update(name, value);
    },
    [formState, name]
  );

  const register = useCallback(
    (ref) => {
      formState.register(name, ref);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  const handleOnChange = useCallback(
    ({ target }, _type) => {
      const value = getTargetValue(target);

      const decodedValue = decode(value, type || _type);

      setValue(decodedValue);

      return decodedValue;
    },
    [setValue, type]
  );

  return {
    getValue: () => encode(formState.getValue(name), type),
    setValue,
    handleOnChangeFactory: (afterChange, type) => (e) => {
      const newValue = handleOnChange(e, type);

      if (isFunction(afterChange)) {
        afterChange(newValue);
      }
    },
    handleOnChange,
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
  if (isEmptyStringLike(value)) {
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
    return isBoolean(value) ? value : value === 'true';
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
