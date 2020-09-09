import React from 'react';
import PropTypes from 'prop-types';

import { FormLabel } from './FormLabel';
import { FormValidationFeedback } from './FormValidationFeedback';
import { FormHelp } from './FormHelp';

export function FormGroup({ children, name, feedback, mockInvalidSibling, help, ...props }) {
  return (
    <div className="form-group">
      <FormLabel {...props} />
      {children}
      {feedback && <FormValidationFeedback mockInvalidSibling={mockInvalidSibling} name={name} />}
      {help && <FormHelp message={help} />}
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
  help: PropTypes.node,
  label: PropTypes.node.isRequired,
  mockInvalidSibling: PropTypes.bool,
  name: PropTypes.string.isRequired,
};
