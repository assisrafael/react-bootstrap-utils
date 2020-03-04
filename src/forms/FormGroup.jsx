import React from 'react';
import PropTypes from 'prop-types';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormLabel } from './FormLabel';
import { FormRadio } from './FormRadio';
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

export function FormGroupRadio({ options, id, ...props }) {
  return (
    <FormGroup {...props}>
      <div>
        {options.map((option, index) => (
          <FormRadio
            key={index}
            {...props}
            checkedValue={option.value}
            valueLabel={option.label}
            id={`${id}-${index}`}
          />
        ))}
      </div>
    </FormGroup>
  );
}

FormGroupRadio.defaultProps = {
  inline: true,
};

FormGroupRadio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  inline: PropTypes.bool,
};

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
