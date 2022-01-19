import React from 'react';
import PropTypes from 'prop-types';

import { booleanOrFunction } from '../forms/helpers/form-helpers';

import { FormGroup2 } from './FormGroup';

import { useFormControl2 } from './helpers/useFormControl';

export function FormTextarea2({ name, required: _required, disabled: _disabled, afterChange, ..._attrs }) {
  const { handleOnChangeFactory, getFormData, getValue } = useFormControl2(name);

  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  const attrs = {
    ..._attrs,
    disabled,
    name,
    required,
  };

  return (
    <textarea {...attrs} className="form-control" onChange={handleOnChangeFactory(afterChange)} value={getValue()} />
  );
}

FormTextarea2.defaultProps = {
  type: 'text',
};

FormTextarea2.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export function FormGroupTextarea2(props) {
  return (
    <FormGroup2 {...props}>
      <FormTextarea2 {...props} />
    </FormGroup2>
  );
}

FormGroupTextarea2.propTypes = {
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
