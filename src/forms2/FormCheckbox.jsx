import React from 'react';
import PropTypes from 'prop-types';

import { useFormControl2 } from './helpers/useFormControl';
import { booleanOrFunction } from './helpers/form-helpers';
import { FormGroup2 } from './FormGroup';

export function FormCheckbox2({ id, name, required: _required, valueLabel, disabled: _disabled, afterChange }) {
  const { getValue, handleOnChangeFactory, registerInputRef, getFormData } = useFormControl2(name, 'boolean');

  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  return (
    <div className="custom-control custom-checkbox">
      <input
        {...{ required, name, id, disabled }}
        type="checkbox"
        className="custom-control-input"
        onChange={handleOnChangeFactory(afterChange)}
        checked={getValue()}
        ref={registerInputRef}
      />
      <label className="custom-control-label" htmlFor={id}>
        {valueLabel}
      </label>
    </div>
  );
}

FormCheckbox2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  valueLabel: PropTypes.node,
};

export function FormGroupCheckbox2(props) {
  return (
    <FormGroup2 mockInvalidSibling={true} {...props}>
      <FormCheckbox2 {...props} />
    </FormGroup2>
  );
}

FormGroupCheckbox2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  falseLabel: PropTypes.node,
  help: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trueLabel: PropTypes.node,
};
