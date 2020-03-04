import React, { useContext } from 'react';
import { FormContext, handleInputChange } from './form-helpers';

export function FormInput({ id, name, required, placeholder }) {
  const formState = useContext(FormContext);

  return (
    <input
      {...{ required, name, id, placeholder }}
      className="form-control"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
    />
  );
}
