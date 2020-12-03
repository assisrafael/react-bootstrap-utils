import React, { useRef } from 'react';
import { debounce } from 'lodash-es';
import { isDefined } from 'js-var-type';

import { flattenObject, getValueByPath, setValueByPath } from '../../utils/getters-setters';

export const FormContext = React.createContext(null);

export class FormHelper {
  constructor(initialValues, debounceWait) {
    this.initialValues = initialValues;
    this.formData = { ...initialValues };
    this.formControls = new Map();
    this.callHooks = debounce((fn) => fn(this.formData), debounceWait);
    this.listeners = [];
    this.nextListenerId = 0;
  }

  register(name, formControl) {
    const value = getValueByPath(this.formData, name);

    if (isDefined(value)) {
      formControl.setValue(value);
    }

    this.formControls.set(name, formControl);
  }

  notify(name, value, hooks) {
    setValueByPath(this.formData, name, value);
    this.callHooks((formData) => {
      hooks(formData);
      this.notifyListeners(formData);
    });
  }

  notifyListeners(formData) {
    for (const { name, observerFn } of this.listeners) {
      setTimeout(() => {
        observerFn(getValueByPath(formData, name));
      }, 0);
    }
  }

  updateFormData(data) {
    const flattenedData = flattenObject(data);

    Object.entries(flattenedData).forEach(([name, value]) => {
      setValueByPath(this.formData, name, value);

      const formControl = this.formControls.get(name);

      if (formControl) {
        formControl.setValue(value);
      }
    });
  }

  unsubscribe(listenerId) {
    this.listeners = this.listeners.filter(({ id }) => id !== listenerId);
  }

  subscribe(_name, _observerFn) {
    const listenerId = this.nextListenerId;

    let name = _name,
      observerFn = _observerFn;

    if (!_observerFn) {
      observerFn = name;
      name = '';
    }

    this.nextListenerId += 1;

    this.listeners.push({
      id: listenerId,
      name,
      observerFn,
    });

    return () => {
      this.unsubscribe(listenerId);
    };
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
    subscribe(name, observerFn) {
      return formHelper.current.subscribe(name, observerFn);
    },
  };
}
