import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './form-helpers';

export function FormValidationFeedback({ name, mockInvalidSibling }) {
  const formState = useContext(FormContext);
  const validationMessage = formState.getValidationMessage(name);

  return (
    <>
      {mockInvalidSibling && formState.getSubmitedAttempted() && validationMessage && (
        <div className="is-invalid"></div>
      )}
      <div className={validationMessage ? 'invalid-feedback' : 'valid-feedback'}>
        {validationMessage || <span>&nbsp;</span>}
      </div>
    </>
  );
}

FormValidationFeedback.defaultProps = {
  mockInvalidSibling: false,
};

FormValidationFeedback.propTypes = {
  name: PropTypes.string.isRequired,
  mockInvalidSibling: PropTypes.bool,
};
