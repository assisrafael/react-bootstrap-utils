import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormSwitch({ id, name, required, trueLabel, falseLabel }) {
  const formState = useContext(FormContext);
  const value = formState.getValue(name) || false;
  const register = useCallback((ref) => {
    formState.register(name, ref);
  }, []);

  return (
    <div className="custom-control custom-switch">
      <input
        {...{ required, name, id }}
        type="checkbox"
        className="custom-control-input"
        onChange={handleInputChange.bind(null, formState)}
        checked={value}
        ref={register}
      />
      <label className="custom-control-label" htmlFor={id}>
        {(trueLabel || falseLabel) && (value ? trueLabel : falseLabel)}
      </label>
    </div>
  );
}

FormSwitch.propTypes = {
  falseLabel: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.any,
  trueLabel: PropTypes.string,
};
