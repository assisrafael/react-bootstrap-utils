import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';
import { normalizeDisabled } from './helpers/form-helpers';

export function FormSwitch({ id, name, required, trueLabel, falseLabel, disabled: _disabled }) {
  const { getValue, handleOnChange, register, getFormData } = useFormControl(name, 'boolean');
  const registerRef = useCallback(register, []);
  const value = getValue();
  const disabled = normalizeDisabled(_disabled, getFormData());

  return (
    <div className="custom-control custom-switch">
      <input
        {...{ required, name, id, disabled }}
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
  required: PropTypes.bool,
  trueLabel: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
