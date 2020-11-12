import React, { useRef } from 'react';
import { debounce } from 'lodash-es';
import { getValueByPath, setValueByPath } from '../../utils/getters-setters';

export const FormContext = React.createContext(null);

export class FormHelper {
  constructor(initialValues, debounceWait) {
    // console.log('new form Helper');
    this.initialValues = initialValues;
    this.formData = { ...initialValues };
    this.formControls = new Map();
    this.callHooks = debounce((fn) => fn(this.formData), debounceWait);
  }

  register(name, formControl) {
    // console.log('registering', name, formControl);
    const value = getValueByPath(this.formData, name);

    if (value) {
      formControl.setValue(value);
    }

    this.formControls.set(name, formControl);
  }

  notify(name, value, hooks) {
    // console.log('notify :>> ', name, value);
    setValueByPath(this.formData, name, value);
    this.callHooks(hooks);
  }

  updateFormData(data) {
    Object.entries(data).forEach(([name, value]) => {
      setValueByPath(this.formData, name, value);

      const formControl = this.formControls.get(name);

      if (formControl) {
        formControl.setValue(value);
      }
    });
  }
}

export function useFormHelper(initialValues, { debounceWait, transform, onChange }) {
  const formHelper = useRef(new FormHelper(initialValues, debounceWait));

  return {
    getFormData() {
      return formHelper.current.formData;
    },
    updateFormData(newData) {
      formHelper.current.updateFormData(newData);
    },
    notify(name, value) {
      formHelper.current.notify(name, value, (formData) => {
        // console.log('debounced hooks');
        if (transform) {
          const transformedData = transform(formData, name);

          formHelper.current.updateFormData(transformedData);
        }

        onChange(formData);
      });
    },
    register(name, formControl) {
      formHelper.current.register(name, formControl);
    },
  };
}
