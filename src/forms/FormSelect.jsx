import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { normalizeOptions } from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';

export function FormSelect({ id, name, options, required, placeholder, afterChange }) {
  const { getFormData, getValue, handleOnChange, register } = useFormControl(name, '', afterChange);
  const registerRef = useCallback(register, []);

  return (
    <select
      {...{ required, name, id }}
      className="custom-select"
      onChange={handleOnChange}
      value={getValue()}
      ref={registerRef}
    >
      <option value="">{placeholder}</option>

      {renderOptions(options, getFormData())}
    </select>
  );
}

FormSelect.propTypes = {
  afterChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.any,
};

function renderOptions(options, formData) {
  return normalizeOptions(options, formData).map(({ value, label }, index) => (
    <option key={index} value={value}>
      {label}
    </option>
  ));
}
