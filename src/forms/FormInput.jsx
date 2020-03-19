import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormInput({ id, type, name, placeholder, required, minLength, maxLength, min, max, pattern, step }) {
  const formState = useContext(FormContext);
  const register = useCallback((ref) => {
    formState.register(name, ref);
  }, []);

  return (
    <input
      {...{ required, name, id, placeholder, type, minLength, maxLength, min, max, pattern, step }}
      className="form-control"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
      ref={register}
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
