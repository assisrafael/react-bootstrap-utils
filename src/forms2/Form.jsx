import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useFormHelper, FormContext } from './helpers/useFormHelper';

export function Form2({ children, initialValues, onSubmit, onChange, transform, debounceWait }) {
  const formHelper = useFormHelper(initialValues, { debounceWait, transform, onChange });

  console.log('rendering form');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onSubmit(formHelper.getFormData());
    },
    [formHelper, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={formHelper}>{children}</FormContext.Provider>
    </form>
  );
}
Form2.defaultProps = {
  debounceWait: 500,
  onChange: () => {},
};
Form2.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  initialValues: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  transform: PropTypes.func,
  debounceWait: PropTypes.number,
};
