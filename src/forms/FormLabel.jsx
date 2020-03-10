import React from 'react';
import PropTypes from 'prop-types';

export function FormLabel({ id, label }) {
  return <label htmlFor={id}>{label}</label>;
}

FormLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
};
