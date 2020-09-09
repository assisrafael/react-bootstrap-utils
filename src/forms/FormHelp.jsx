import React from 'react';
import PropTypes from 'prop-types';
import { formatClasses } from '../utils/attributes';

export function FormHelp({ id, inline, message }) {
  return (
    <small id={`${id}-help`} className={formatClasses(['text-muted', inline ? 'ml-2' : 'form-text'])}>
      {message}
    </small>
  );
}

FormHelp.defaultProps = {
  inline: false,
};

FormHelp.propTypes = {
  id: PropTypes.string,
  message: PropTypes.node.isRequired,
  inline: PropTypes.bool,
};
