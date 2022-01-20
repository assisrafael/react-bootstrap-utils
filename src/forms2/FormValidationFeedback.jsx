import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from './helpers/useFormHelper';

export function FormValidationFeedback({ name, mockInvalidSibling }) {
  const formHelper = useContext(FormContext);

  const validationMessage = useMemo(() => formHelper.getValidationMessage(name), [formHelper, name]);
  const submitAttemped = useMemo(() => formHelper.getSubmitedAttempted(), [formHelper]);


  return (
    <>
      {mockInvalidSibling && submitAttemped && validationMessage && <div className="is-invalid"></div>}
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
