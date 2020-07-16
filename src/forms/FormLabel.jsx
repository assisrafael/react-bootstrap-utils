import React from 'react';
import PropTypes from 'prop-types';

export function FormLabel({ id, label, required: _required }) {
  const required = typeof _required === 'boolean';

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
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
