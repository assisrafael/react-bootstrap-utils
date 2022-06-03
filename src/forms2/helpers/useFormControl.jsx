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

      const nextValue = newValueFn(value);

      // utilizar o setState como função trouxe problemas na ficha de ensaio
      // não foi possível identificar o motivo, porém o callback não era acionado e o valor não era atualizado
      // e nem era enviada a notificação de alteração para o form-helper
      _setValue(isDefined(nextValue) ? nextValue : '');
      formHelper.notify(name, nextValue);
    },
    [formHelper, name, value]
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
    handleOnChangeFactory: (afterChange, type) => (e) => {
      const newValue = handleOnChange(e, type);

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
