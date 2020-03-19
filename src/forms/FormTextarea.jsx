import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormTextarea({ id, name, required, placeholder, rows }) {
  const formState = useContext(FormContext);
  const register = useCallback((ref) => {
    formState.register(name, ref);
  }, []);

  return (
    <textarea
      {...{ required, name, id, placeholder, rows }}
      className="form-control"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
      ref={register}
    ></textarea>
  );
}

FormTextarea.defaultProps = {
  rows: 5,
};

FormTextarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.any,
  rows: PropTypes.number,
};
