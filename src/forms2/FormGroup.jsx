import React from 'react';
import PropTypes from 'prop-types';

import { FormLabel2 } from './FormLabel';
import { FormHelp2 } from './FormHelp';
import { FormValidationFeedback } from './FormValidationFeedback';

export function FormGroup2({ children, name, feedback, mockInvalidSibling, help, ...props }) {
  return (
    <div className="form-group">
      <FormLabel2 {...props} />
      {children}
      {feedback && <FormValidationFeedback mockInvalidSibling={mockInvalidSibling} name={name} />}
      {help && <FormHelp2 message={help} />}
    </div>
  );
}

FormGroup2.defaultProps = {
  feedback: true,
  mockInvalidSibling: false,
};

FormGroup2.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  feedback: PropTypes.bool,
  help: PropTypes.node,
  label: PropTypes.node.isRequired,
  mockInvalidSibling: PropTypes.bool,
  name: PropTypes.string.isRequired,
};
