import React from 'react';
import PropTypes from 'prop-types';

export function FormLabel({ id, label, required }) {
  return (
    <label htmlFor={id}>
      {label}

      {required && <span className="text-danger"> *</span>}
    </label>
  );
}

FormLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};
