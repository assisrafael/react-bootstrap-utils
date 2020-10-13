import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useFormControl } from './helpers/useFormControl';
import { booleanOrFunction } from './helpers/form-helpers';
import { FormGroup } from './FormGroup';

export function FormTextarea({ name, required: _required, disabled: _disabled, afterChange, ..._attrs }) {
  const { getValue, handleOnChangeFactory, register, getFormData } = useFormControl(name);
  const registerRef = useCallback(register, [register]);
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  const attrs = {
    ..._attrs,
    disabled,
    name,
    required,
  };

  return (
    <textarea
      {...attrs}
      className="form-control"
      onChange={handleOnChangeFactory(afterChange)}
      value={getValue()}
      ref={registerRef}
    ></textarea>
  );
}

FormTextarea.defaultProps = {
  rows: 5,
};

FormTextarea.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export function FormGroupTextarea(props) {
  return (
    <FormGroup {...props}>
      <FormTextarea {...props} />
    </FormGroup>
  );
}

FormGroupTextarea.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
