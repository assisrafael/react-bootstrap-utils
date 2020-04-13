import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';

export function FormCheckbox({ id, name, required, valueLabel }) {
  const { getValue, handleOnChange, register } = useFormControl(name, 'boolean');
  const registerRef = useCallback(register, []);

  return (
    <div className="custom-control custom-checkbox">
      <input
        {...{ required, name, id }}
        type="checkbox"
        className="custom-control-input"
        onChange={handleOnChange}
        checked={getValue()}
        ref={registerRef}
      />
      <label className="custom-control-label" htmlFor={id}>
        {valueLabel}
      </label>
    </div>
  );
}

FormCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valueLabel: PropTypes.string,
  required: PropTypes.any,
};
