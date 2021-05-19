import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from './helpers/useFormHelper';

export function FormValidationFeedback2({ name, mockInvalidSibling }) {
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

FormValidationFeedback2.defaultProps = {
  mockInvalidSibling: false,
};

FormValidationFeedback2.propTypes = {
  name: PropTypes.string.isRequired,
  mockInvalidSibling: PropTypes.bool,
};
