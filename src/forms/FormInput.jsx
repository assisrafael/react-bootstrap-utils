import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';

export function FormInput({ id, type, name, placeholder, required, minLength, maxLength, min, max, pattern, step }) {
  const { getValue, handleOnChange, register } = useFormControl(name, type);
  const registerRef = useCallback(register, []);

  const attrs = { required, name, id, placeholder, type, minLength, maxLength, min, max, pattern, step };

  if (type === 'datetime-local') {
    attrs.defaultValue = getValue();
  } else {
    attrs.value = getValue();
  }

  return <input {...attrs} className="form-control" onChange={handleOnChange} ref={registerRef} />;
}

FormInput.defaultProps = {
  type: 'text',
};

FormInput.propTypes = {
  id: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.string,
  min: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.any,
  step: PropTypes.string,
  type: PropTypes.string,
};
