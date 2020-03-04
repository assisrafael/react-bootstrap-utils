import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormCheckbox({ id, name, required, valueLabel }) {
  const formState = useContext(FormContext);

  function onChange(e) {
    const { name, value } = handleInputChange(e);

    formState.update(name, value);
  }

  const value = formState.getValue(name) || false;

  return (
    <div className="custom-control custom-checkbox">
      <input
        {...{ required, name, id }}
        type="checkbox"
        className="custom-control-input"
        onChange={onChange}
        checked={value}
      />
      <label className="custom-control-label" htmlFor={id}>
        {valueLabel}
      </label>
    </div>
  );
}

FormCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valueLabel: PropTypes.string,
};
