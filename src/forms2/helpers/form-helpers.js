import React from 'react';
import { isFunction, isUndefined, isArray, isObject, isEmptyStringLike, isBoolean } from 'js-var-type';

import { getValueByPath } from '../../utils/getters-setters';
import { fromDatetimeLocal, toDatetimeLocal } from '../../utils/formatters';

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

export function getTargetValue(target) {
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

export function handleInputChange(formState, event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  formState.update(name, value);
}

export function normalizeOptions(options, formData, extraData) {
  const _options = isFunction(options) ? options(formData, extraData) : options;

  if (!isArray(_options)) {
    throw new Error('Select Options should be an array');
  }

  return _options.map((option) => ({
    value: isUndefined(option.value) ? option : option.value,
    label: isUndefined(option.label) ? serializeValue(option) : option.label,
  }));
}

export function booleanOrFunction(property, formData) {
  if (!isFunction(property)) {
    return property;
  }

  return property(formData);
}

export function serializeValue(value) {
  if (!isObject(value)) {
    return value.toString();
  }

  return JSON.stringify(value);
}

export function getSelectedOption(value, options, trackBy) {
  if (!trackBy) {
    return options.find((option) => option.value === value);
  }

  return options.find((option) => getValueByPath(option.value, trackBy) === getValueByPath(value, trackBy));
}

export function getSelectedValue(value, options, trackBy) {
  let selectedValue = value;

  if (trackBy) {
    const selectedOption = getSelectedOption(value, options, trackBy);

    if (selectedOption) {
      selectedValue = selectedOption.value;
    }
  }

  return serializeValue(selectedValue);
}

export function getOptionsType(options) {
  return options.length > 0 ? typeof options[0].value : undefined;
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

export function encode(value, type) {
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

export function decode(value, type) {
  if (type === 'number') {
    return parseFloat(value);
  }

  if (type === 'boolean') {
    return isBoolean(value) ? value : value === 'true';
  }

  return value;
}

export function valuesAreEqual(value1, value2, trackBy) {
  const _value1 = value1 && isObject(value1) && trackBy ? getValueByPath(value1, trackBy) : value1;
  const _value2 = value2 && isObject(value2) && trackBy ? getValueByPath(value2, trackBy) : value2;

  return _value1 === _value2;
}
