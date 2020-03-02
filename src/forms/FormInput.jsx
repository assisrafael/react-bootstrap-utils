import React, { useContext } from 'react';
import { FormContext, handleInputChange } from './form-helpers';

export function FormInput({ id, name, required, placeholder }) {
  const formState = useContext(FormContext);

  function onChange(e) {
    const { name, value } = handleInputChange(e);

    formState.update(name, value);
  }

  return (
    <input
      {...{ required, name, id, placeholder }}
      className="form-control"
      onChange={onChange}
      value={formState.getValue(name) || ''}
    />
  );
}
