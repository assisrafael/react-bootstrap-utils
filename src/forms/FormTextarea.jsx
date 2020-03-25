import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';

export function FormTextarea({ id, name, required, placeholder, rows }) {
  const { getValue, handleOnChange, register } = useFormControl(name);
  const registerRef = useCallback(register, []);

  return (
    <textarea
      {...{ required, name, id, placeholder, rows }}
      className="form-control"
      onChange={handleOnChange}
      value={getValue()}
      ref={registerRef}
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
