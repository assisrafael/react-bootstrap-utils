import React from 'react';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormLabel } from './FormLabel';
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

export function FormGroupCheckbox(props) {
  return (
    <FormGroup {...props}>
      <FormCheckbox {...props} />
    </FormGroup>
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
