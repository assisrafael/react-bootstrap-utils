import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  normalizeOptions,
  booleanOrFunction,
  serializeValue,
  getSelectedValue,
  getOptionsType,
} from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';
import { FormGroup } from './FormGroup';

export function FormSelect({
  name,
  options,
  required: _required,
  placeholder,
  trackBy,
  disabled: _disabled,
  afterChange,
  ..._attrs
}) {
  const { getFormData, getValue, handleOnChangeFactory, register } = useFormControl(name);
  const registerRef = useCallback(register, [register]);
  const value = getValue();
  const normalizedOptions = normalizeOptions(options, getFormData());
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  const attrs = {
    ..._attrs,
    disabled,
    name,
    required,
  };

  return (
    <select
      {...attrs}
      className="custom-select"
      onChange={handleOnChangeFactory(afterChange, getOptionsType(normalizedOptions))}
      value={getSelectedValue(value, normalizedOptions, trackBy)}
      ref={registerRef}
    >
      <option value="">{placeholder}</option>

      {renderOptions(normalizedOptions, trackBy)}
    </select>
  );
}

FormSelect.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.string.isRequired }),
      ])
    ),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trackBy: PropTypes.string,
};

export function FormGroupSelect(props) {
  return (
    <FormGroup {...props}>
      <FormSelect {...props} />
    </FormGroup>
  );
}

FormGroupSelect.propTypes = {
  afterChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.node.isRequired,
        }),
      ])
    ),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trackBy: PropTypes.string,
};

function renderOptions(options, trackBy) {
  return options.map(({ value, label }, index) => (
    <option key={index} name={trackBy} value={serializeValue(value)}>
      {label}
    </option>
  ));
}
