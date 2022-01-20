import React from 'react';
import PropTypes from 'prop-types';

import { formatClasses } from '../utils/attributes';

import { useFormControl2 } from './helpers/useFormControl';
import { booleanOrFunction } from './helpers/form-helpers';
import { FormGroup2 } from './FormGroup';

export function FormRadio2({
  id,
  name,
  required: _required,
  checkedValue,
  valueLabel,
  inline,
  disabled: _disabled,
  afterChange,
}) {
  const { getValue, handleOnChangeFactory, registerInputRef, getFormData } = useFormControl2(name);
  const value = getValue();
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  return (
    <div className={formatClasses([`custom-control`, `custom-radio`, inline && 'custom-control-inline'])}>
      <input
        {...{ required, name, id, disabled }}
        type="radio"
        className="custom-control-input"
        onChange={handleOnChangeFactory(afterChange)}
        checked={value === checkedValue}
        value={checkedValue}
        ref={registerInputRef}
      />
      <label className="custom-control-label" htmlFor={id}>
        {valueLabel}
      </label>
    </div>
  );
}

FormRadio2.defaultProps = {
  inline: false,
};

FormRadio2.propTypes = {
  afterChange: PropTypes.func,
  checkedValue: PropTypes.any,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  valueLabel: PropTypes.node,
};

export function FormGroupRadio2({ options, id, ...props }) {
  return (
    <FormGroup2 mockInvalidSibling={true} {...props}>
      <div>
        {options.map((option, index) => (
          <FormRadio2
            key={index}
            {...props}
            checkedValue={option.value}
            valueLabel={option.label}
            id={`${id}-${index}`}
          />
        ))}
      </div>
    </FormGroup2>
  );
}

FormGroupRadio2.defaultProps = {
  inline: true,
};

FormGroupRadio2.propTypes = {
  afterChange: PropTypes.func,
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
