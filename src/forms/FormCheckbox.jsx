import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useFormControl } from './helpers/useFormControl';
import { booleanOrFunction } from './helpers/form-helpers';

export function FormCheckbox({ id, name, required: _required, valueLabel, disabled: _disabled }) {
  const { getValue, handleOnChange, register, getFormData } = useFormControl(name, 'boolean');
  const registerRef = useCallback(register, [register]);
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  return (
    <div className="custom-control custom-checkbox">
      <input
        {...{ required, name, id, disabled }}
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
  valueLabel: PropTypes.node,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
