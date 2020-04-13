import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';

export function FormSwitch({ id, name, required, trueLabel, falseLabel }) {
  const { getValue, handleOnChange, register } = useFormControl(name, 'boolean');
  const registerRef = useCallback(register, []);
  const value = getValue();

  return (
    <div className="custom-control custom-switch">
      <input
        {...{ required, name, id }}
        type="checkbox"
        className="custom-control-input"
        onChange={handleOnChange}
        checked={value}
        ref={registerRef}
      />
      <label className="custom-control-label" htmlFor={id}>
        {(trueLabel || falseLabel) && (value ? trueLabel : falseLabel)}
      </label>
    </div>
  );
}

FormSwitch.propTypes = {
  falseLabel: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.any,
  trueLabel: PropTypes.string,
};
