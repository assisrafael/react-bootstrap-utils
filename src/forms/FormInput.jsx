import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormInput({ id, type, name, placeholder, required, minLength, maxLength, min, max, pattern, step }) {
  const formState = useContext(FormContext);

  return (
    <input
      {...{ required, name, id, placeholder, type, minLength, maxLength, min, max, pattern, step }}
      className="form-control"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
    />
  );
}

FormInput.defaultProps = {
  type: 'text',
};

FormInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.any,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  pattern: PropTypes.string,
  step: PropTypes.string,
};
