import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useFormControl } from './helpers/useFormControl';
import { booleanOrFunction } from './helpers/form-helpers';
import { formatClasses } from '../utils/attributes';
import { FormGroup } from './FormGroup';

export function FormRadio({ id, name, required: _required, checkedValue, valueLabel, inline, disabled: _disabled }) {
  const { getValue, handleOnChange, register, getFormData } = useFormControl(name);
  const registerRef = useCallback(register, [register]);
  const value = getValue();
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  return (
    <div className={formatClasses([`custom-control`, `custom-radio`, inline && 'custom-control-inline'])}>
      <input
        {...{ required, name, id, disabled }}
        type="radio"
        className="custom-control-input"
        onChange={handleOnChange}
        checked={value === checkedValue}
        value={checkedValue}
        ref={registerRef}
      />
      <label className="custom-control-label" htmlFor={id}>
        {valueLabel}
      </label>
    </div>
  );
}

FormRadio.defaultProps = {
  inline: false,
};

FormRadio.propTypes = {
  checkedValue: PropTypes.any,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  valueLabel: PropTypes.node,
};

export function FormGroupRadio({ options, id, ...props }) {
  return (
    <FormGroup mockInvalidSibling={true} {...props}>
      <div>
        {options.map((option, index) => (
          <FormRadio
            key={index}
            {...props}
            checkedValue={option.value}
            valueLabel={option.label}
            id={`${id}-${index}`}
          />
        ))}
      </div>
    </FormGroup>
  );
}

FormGroupRadio.defaultProps = {
  inline: true,
};

FormGroupRadio.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  help: PropTypes.node,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
    })
  ),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
