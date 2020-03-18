import React, { useState } from 'react';
import { useValueMap } from '../utils/useValueMap';

export const FormContext = React.createContext(null);

export function useForm(initialState) {
  const [formState, setFormState] = useState(initialState);
  const { getValue: getValidationMessage, setValue: setValidationMessage } = useValueMap();

  return {
    update(name, value) {
      //target.setCustomValidity("");
      setFormState({
        ...formState,
        [name]: value,
      });
    },
    getFormData() {
      return formState;
    },
    getValue(name) {
      return formState[name];
    },
    reset() {
      setFormState(initialState);
    },
    updateElementValidationMessage(name, element) {
      if (element.valid) {
        setValidationMessage(name, '');
      } else {
        setValidationMessage(name, element.validationMessage);
      }
    },
    getValidationMessage(name) {
      return getValidationMessage(name);
    },
  };
}

export function handleInputChange(formState, event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  formState.update(name, value);
}

export function handleOnInvalid(formState, name, { target }) {
  formState.updateElementValidationMessage(name, target);
}

export function normalizeOptions(options, formData) {
  let _options = typeof options === 'function' ? options(formData) : options;

  if (!Array.isArray(_options)) {
    throw new Error('Select Options should be an array');
  }

  return _options.map((option) => {
    if (typeof option !== 'string') {
      return option;
    }

    return {
      value: option,
      label: option,
    };
  });
}
