import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';

export function FormInput({ id, type, name, placeholder, required, minLength, maxLength, min, max, pattern, step }) {
  const { getValue, handleOnChange, register } = useFormControl(name);
  const registerRef = useCallback(register, []);

  return (
    <input
      {...{ required, name, id, placeholder, type, minLength, maxLength, min, max, pattern, step }}
      className="form-control"
      onChange={handleOnChange}
      value={getValue()}
      ref={registerRef}
    />
  );
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
