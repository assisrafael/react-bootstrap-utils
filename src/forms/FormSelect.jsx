import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange, normalizeOptions, handleOnInvalid } from './form-helpers';

export function FormSelect({ id, name, options, required, placeholder }) {
  const formState = useContext(FormContext);

  return (
    <select
      {...{ required, name, id }}
      className="form-control"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
      onInvalid={handleOnInvalid.bind(null, formState, name)}
    >
      <option value="">{placeholder}</option>

      {renderOptions(options, formState.getFormData())}
    </select>
  );
}

FormSelect.propTypes = {
  id: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.any,
};

function renderOptions(options, formData) {
  return normalizeOptions(options, formData).map(({ value, label }, index) => {
    return (
      <option key={index} value={value}>
        {label}
      </option>
    );
  });
}
