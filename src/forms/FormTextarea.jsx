import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';
import { normalizeDisabled } from './helpers/form-helpers';

export function FormTextarea({ id, name, required, placeholder, rows, disabled: _disabled }) {
  const { getValue, handleOnChange, register, getFormData } = useFormControl(name);
  const registerRef = useCallback(register, [register]);
  const disabled = normalizeDisabled(_disabled, getFormData());

  return (
    <textarea
      {...{ required, name, id, placeholder, rows, disabled }}
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
  required: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
