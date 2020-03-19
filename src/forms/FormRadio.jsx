import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormRadio({ id, name, required, checkedValue, valueLabel, inline }) {
  const formState = useContext(FormContext);
  const value = formState.getValue(name) || false;
  const register = useCallback((ref) => {
    formState.register(name, ref);
  }, []);

  return (
    <div className={`custom-control custom-radio ${inline ? 'custom-control-inline' : ''}`}>
      <input
        {...{ required, name, id }}
        type="radio"
        className="custom-control-input"
        onChange={handleInputChange.bind(null, formState)}
        checked={value === checkedValue}
        value={checkedValue}
        ref={register}
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
