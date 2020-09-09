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

export function FormGroup({ children, name, feedback, mockInvalidSibling, ...props }) {
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  feedback: PropTypes.bool,
  label: PropTypes.node.isRequired,
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

FormGroupAutocomplete.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filter: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  openOnFocus: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  template: PropTypes.func,
  type: PropTypes.string,
};

export function FormGroupCheckbox(props) {
  return (
    <FormGroup mockInvalidSibling={true} {...props}>
      <FormCheckbox {...props} />
    </FormGroup>
  );
}

FormGroupCheckbox.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  falseLabel: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trueLabel: PropTypes.node,
};

export function FormGroupInput(props) {
  return (
    <FormGroup {...props}>
      <FormInput {...props} />
    </FormGroup>
  );
}

FormGroupInput.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  max: PropTypes.string,
  maxLength: PropTypes.string,
  min: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  step: PropTypes.string,
  type: PropTypes.string,
};

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
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
    })
  ),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export function FormGroupSelect(props) {
  return (
    <FormGroup {...props}>
      <FormSelect {...props} />
    </FormGroup>
  );
}

FormGroupSelect.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.node.isRequired,
        }),
      ])
    ),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trackBy: PropTypes.string,
};

export function FormGroupSwitch(props) {
  return (
    <FormGroup mockInvalidSibling={true} {...props}>
      <FormSwitch {...props} />
    </FormGroup>
  );
}

FormGroupSwitch.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  falseLabel: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  trueLabel: PropTypes.node,
};

export function FormGroupTextarea(props) {
  return (
    <FormGroup {...props}>
      <FormTextarea {...props} />
    </FormGroup>
  );
}

FormGroupTextarea.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
