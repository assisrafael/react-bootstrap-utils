import React from 'react';
import { FormGroup } from './FormGroup';
import { FormInput } from './FormInput';

export function FormGroupInput(props) {
  return (
    <FormGroup {...props}>
      <FormInput {...props} />
    </FormGroup>
  );
}
