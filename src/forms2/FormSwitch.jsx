import React from 'react';
import PropTypes from 'prop-types';

import { useFormControl2 } from './helpers/useFormControl';
import { booleanOrFunction } from '../forms/helpers/form-helpers';

export function FormSwitch2({
  id,
  name,
  required: _required,
  trueLabel,
  falseLabel,
  disabled: _disabled,
  afterChange,
}) {
  console.log('rendering switch', name);
  const { getValue, handleOnChangeFactory, getFormData } = useFormControl2(name, 'boolean');

  const value = getValue();
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  return (
    <div className="custom-control custom-switch">
      <input
        {...{ required, name, id, disabled }}
        type="checkbox"
        className="custom-control-input"
        onChange={handleOnChangeFactory(afterChange)}
        checked={value}
      />
      <label className="custom-control-label" htmlFor={id}>
        {(trueLabel || falseLabel) && (value ? trueLabel : falseLabel)}
      </label>
    </div>
  );
}

FormSwitch2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  falseLabel: PropTypes.node,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trueLabel: PropTypes.node,
};
