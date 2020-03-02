import React, { useContext } from 'react';
import { FormContext, handleInputChange } from './form-helpers';

export function FormSelect({ id, name, options, required, placeholder }) {
  const formState = useContext(FormContext);

  function onChange(e) {
    const { name, value } = handleInputChange(e);

    formState.update(name, value);
  }

  return (
    <select
      {...{ required, name, id }}
      className="form-control"
      onChange={onChange}
      value={formState.getValue(name) || ''}
    >
      <option value="">{placeholder}</option>

      {renderOptions(options, formState.getFormData())}
    </select>
  );
}

function renderOptions(options, formData) {
  let _options = typeof options === 'function' ? options(formData) : options;

  if (!Array.isArray(_options)) {
    throw new Error('Select Options should be an array');
  }

  return _options.map((option, index) => {
    let value, label;

    if (typeof option === 'string') {
      value = label = option;
    } else {
      value = option.value;
      label = option.label;
    }

    return (
      <option key={index} value={value}>
        {label}
      </option>
    );
  });
}
