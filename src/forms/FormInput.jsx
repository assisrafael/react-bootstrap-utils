import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormInput({ id, type, name, required, placeholder }) {
  const formState = useContext(FormContext);

  return (
    <input
      {...{ required, name, id, placeholder, type }}
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
};
