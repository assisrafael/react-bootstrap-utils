import React from 'react';
import PropTypes from 'prop-types';
import { isBoolean } from 'js-var-type';

export function FormLabel({ id, label, required: _required }) {
  const required = isBoolean(_required) && _required;

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
