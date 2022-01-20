import { isDefined, isFunction } from 'js-var-type';
import { useCallback, useContext, useEffect, useState } from 'react';

import { decode, getTargetValue, encode } from './form-helpers';

import { FormContext } from './useFormHelper';

export function useFormControl2(name, type) {
  const formHelper = useContext(FormContext);
  const [value, _setValue] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const setValue = useCallback(
    (newValue) => {
      const newValueFn = isFunction(newValue) ? newValue : () => newValue;

      _setValue((prevValue) => {
        const nextValue = newValueFn(prevValue);

        formHelper.notify(name, nextValue);

        return isDefined(nextValue) ? nextValue : '';
      });
    },
    [formHelper, name]
  );

  const handleOnChange = useCallback(
    ({ target }, _type, maskFunction) => {
      const value = getTargetValue(target);

      let maskedOrDecodedValue;

      if (isFunction(maskFunction)) {
        maskedOrDecodedValue = maskFunction(value);
      } else {
        maskedOrDecodedValue = decode(value, type || _type);
      }

      setValue(maskedOrDecodedValue);

      return maskedOrDecodedValue;
    },
    [setValue, type]
  );

  useEffect(() => {
    formHelper.register(name, {
      setValue: _setValue,
    });
    setIsRegistered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerInputRef = useCallback(
    (ref) => {
      formHelper.registerRef(name, ref);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  return {
    getValue() {
      return encode(value, type);
    },
    setValue,
    isRegistered() {
      return isRegistered;
    },
    handleOnChangeFactory: (afterChange, type, maskFunction) => (e) => {
      const newValue = handleOnChange(e, type, maskFunction);

      if (isFunction(afterChange)) {
        afterChange(newValue);
      }
    },
    getFormData() {
      return formHelper?.getFormData?.();
    },
    getFormSubmitedAttempted: () => formHelper.getFormSubmitedAttempted,
    isValid: () => formHelper.getValidationMessage(name) === '',
    registerInputRef,
  };
}
