import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange, normalizeOptions } from './form-helpers';

export function FormSelect({ id, name, options, required, placeholder }) {
  const formState = useContext(FormContext);
  const register = useCallback((ref) => {
    formState.register(name, ref);
  }, []);

  return (
    <select
      {...{ required, name, id }}
      className="custom-select"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
      ref={register}
    >
      <option value="">{placeholder}</option>

      {renderOptions(options, formState.getFormData())}
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
};

function renderOptions(options, formData) {
  return normalizeOptions(options, formData).map(({ value, label }, index) => (
    <option key={index} value={value}>
      {label}
    </option>
  ));
}
