import React from 'react';
import { FormLabel } from './FormLabel';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormSwitch } from './FormSwitch';

function FormGroup({ children, ...props }) {
  return (
    <div className="form-group">
      <FormLabel {...props} />
      {children}
    </div>
  );
}

export function FormGroupInput(props) {
  return (
    <FormGroup {...props}>
      <FormInput {...props} />
    </FormGroup>
  );
}

export function FormGroupSelect(props) {
  return (
    <FormGroup {...props}>
      <FormSelect {...props} />
    </FormGroup>
  );
}

export function FormGroupSwitch(props) {
  return (
    <FormGroup {...props}>
      <FormSwitch {...props} />
    </FormGroup>
  );
}
