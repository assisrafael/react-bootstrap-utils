import React from 'react';
import { getValueByPath } from '../../utils/getters-setters';
import { isFunction } from '../../utils/types';

export const FormContext = React.createContext(null);

export function validateFormElement({ name, validations = [], formData, elementRefs }) {
  let validationMessage = '';
  const value = getValueByPath(formData, name);

  validations.some(({ message, validate }) => {
    const isValid = validate(value, formData);

    if (!isValid) {
      validationMessage = message;
    }

    return !isValid;
  });

  for (const elementRef of elementRefs) {
    if (!elementRef) {
      continue;
    }

    elementRef.setCustomValidity(validationMessage);
  }

  return validationMessage;
}

export function handleInputChange(formState, event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  formState.update(name, value);
}

export function normalizeOptions(options, formData, extraData) {
  const _options = typeof options === 'function' ? options(formData, extraData) : options;

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

export function booleanOrFunction(property, formData) {
  if (!isFunction(property)) {
    return property;
  }

  return property(formData);
}
