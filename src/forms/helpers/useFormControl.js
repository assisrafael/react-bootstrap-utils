import { useContext, useCallback } from 'react';
import { isFunction } from 'js-var-type';

import { FormContext, getTargetValue, decode, encode } from './form-helpers';

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
      const previousValue = encode(formState.getValue(name), type);
      const newValue = handleOnChange(e, type);

      if (isFunction(afterChange)) {
        afterChange(newValue, previousValue);
      }
    },
    handleOnChange,
    register,
    getFormData: () => formState.getFormData(),
    isValid: () => formState.getValidationMessage(name) === '',
    getFormSubmitedAttempted: () => formState.getSubmitedAttempted(),
  };
}
