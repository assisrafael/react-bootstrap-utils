import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormAutocomplete } from './FormAutocomplete';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormLabel } from './FormLabel';
import { FormRadio } from './FormRadio';
import { FormSelect } from './FormSelect';
import { FormSwitch } from './FormSwitch';
import { FormTextarea } from './FormTextarea';
import { FormContext } from './form-helpers';

function FormGroup({ children, name, ...props }) {
  const formState = useContext(FormContext);
  const validationMessage = formState.getValidationMessage(name);

  return (
    <div className="form-group">
      <FormLabel {...props} />
      {children}
      <div className="valid-feedback">&nbsp;</div>
      <div className="invalid-feedback">{validationMessage}</div>
    </div>
  );
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element,
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
    <FormGroup {...props}>
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
