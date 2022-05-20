import React from 'react';
import PropTypes from 'prop-types';

import { booleanOrFunction } from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';

export function FormLabel({ id, label, required: _required }) {
  const { getFormData } = useFormControl();
  const required = booleanOrFunction(_required, getFormData());

  return (
    <label htmlFor={id}>
      {label}

      {required && <span className="text-danger"> *</span>}
    </label>
  );
}

FormLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
