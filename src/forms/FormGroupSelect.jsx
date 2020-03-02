import React from 'react';
import { FormGroup } from './FormGroup';
import { FormSelect } from './FormSelect';

export function FormGroupSelect(props) {
  return (
    <FormGroup {...props}>
      <FormSelect {...props} />
    </FormGroup>
  );
}
