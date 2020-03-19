import React from 'react';
import PropTypes from 'prop-types';
import { FormAutocomplete } from './FormAutocomplete';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormLabel } from './FormLabel';
import { FormRadio } from './FormRadio';
import { FormSelect } from './FormSelect';
import { FormSwitch } from './FormSwitch';
import { FormTextarea } from './FormTextarea';
import { FormValidationFeedback } from './FormValidationFeedback';

function FormGroup({ children, name, feedback, mockInvalidSibling, ...props }) {
  return (
    <div className="form-group">
      <FormLabel {...props} />
      {children}
      {feedback && <FormValidationFeedback mockInvalidSibling={mockInvalidSibling} name={name} />}
    </div>
  );
}

FormGroup.defaultProps = {
  feedback: true,
  mockInvalidSibling: false,
};

FormGroup.propTypes = {
  children: PropTypes.element,
  feedback: PropTypes.bool,
  mockInvalidSibling: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export function FormGroupAutocomplete(props) {
  return (
    <FormGroup {...props}>
      <FormAutocomplete {...props} />
    </FormGroup>
  );
}

export function FormGroupCheckbox(props) {
  return (
    <FormGroup mockInvalidSibling={true} {...props}>
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
    <FormGroup mockInvalidSibling={true} {...props}>
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
  id: PropTypes.string,
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
    <FormGroup mockInvalidSibling={true} {...props}>
      <FormSwitch {...props} />
    </FormGroup>
  );
}

export function FormGroupTextarea(props) {
  return (
    <FormGroup {...props}>
      <FormTextarea {...props} />
    </FormGroup>
  );
}
