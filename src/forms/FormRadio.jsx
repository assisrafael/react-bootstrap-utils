import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from './helpers/useFormControl';

export function FormRadio({ id, name, required, checkedValue, valueLabel, inline }) {
  const { getValue, handleOnChange, register } = useFormControl(name, 'boolean');
  const registerRef = useCallback(register, []);
  const value = getValue();

  return (
    <div className={`custom-control custom-radio ${inline ? 'custom-control-inline' : ''}`}>
      <input
        {...{ required, name, id }}
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
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  required: PropTypes.any,
  valueLabel: PropTypes.string,
};
