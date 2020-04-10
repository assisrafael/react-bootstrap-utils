import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { normalizeOptions } from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';
import { getValueByPath } from '../utils/getters-setters';

export function FormSelect({ id, name, options, required, placeholder, trackBy }) {
  const { getFormData, getValue, handleOnChange, register } = useFormControl(name);
  const registerRef = useCallback(register, []);
  const value = getValue();
  const normalizedOptions = normalizeOptions(options, getFormData());

  return (
    <select
      {...{ required, name, id }}
      className="custom-select"
      onChange={handleOnChange}
      value={getSelectedOption(value, normalizedOptions, trackBy)}
      ref={registerRef}
    >
      <option value="">{placeholder}</option>

      {renderOptions(normalizedOptions, trackBy)}
    </select>
  );
}

FormSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.any,
  trackBy: PropTypes.string,
};

function renderOptions(options, trackBy) {
  return options.map(({ value, label }, index) => (
    <option key={index} name={trackBy} value={serializeValue(value)}>
      {label}
    </option>
  ));
}

function getSelectedOption(value, options, trackBy) {
  let selectedValue = value;

  if (trackBy) {
    const selectedOption = options.find(
      (option) => getValueByPath(option.value, trackBy) === getValueByPath(value, trackBy)
    );

    if (selectedOption) {
      selectedValue = selectedOption.value;
    }
  }

  return serializeValue(selectedValue);
}

function serializeValue(value) {
  if (typeof value !== 'object') {
    return value;
  }

  return JSON.stringify(value);
}
