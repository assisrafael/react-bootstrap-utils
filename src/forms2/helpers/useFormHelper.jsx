import React, { useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { isDefined } from 'js-var-type';

import { flattenObject, getValueByPath, setValueByPath } from '../../utils/getters-setters';
import { useArrayValueMap } from '../../utils/useValueMap';
import { validateFormElement } from '../../forms/helpers/form-helpers';

export const FormContext = React.createContext(null);

export class FormHelper {
  constructor(initialValues, debounceWait) {
    this.initialValues = initialValues;
    this.formData = { ...initialValues };
    this.formControls = new Map();
    this.callHooks = debounce((fn) => fn(this.formData), debounceWait);
    this.listeners = [];
    this.nextListenerId = 0;
    this.submitAttempted = false;
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

  resetState() {
    const resetedState = {};

    for (const key of Object.keys(this.formData)) {
      resetedState[key] = this.initialValues[key] ?? '';
    }

    this.updateFormData(resetedState);
  }
}

export function useFormHelper(initialValues, { debounceWait, transform, onChange, validations } = {}) {
  const formHelper = useRef(new FormHelper(initialValues, debounceWait));
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { getAllKeys: getElementNames, get: getElementRefs, push: registerElementRef } = useArrayValueMap();
  const formState = formHelper.current.formData;

  return {
    getFormData() {
      return formHelper.current.formData;
    },
    updateFormData(newData) {
      formHelper.current.updateFormData(newData);

      if (validations) {
        this.validateForm(newData);
      }
    },
    notify(name, value) {
      formHelper.current.notify(name, value, (formData) => {
        if (transform) {
          transform(formData, name, this.updateFormData.bind(this));
        }

        onChange(formData);
      });
    },
    register(name, formControl) {
      formHelper.current.register(name, formControl);
    },
    registerRef(name, inputRef) {
      registerElementRef(name, inputRef);

      if (validations) {
        validateFormElement({
          name,
          formData: formState,
          validations: validations[name],
          elementRefs: [inputRef],
        });
      }
    },
    subscribe(name, observerFn) {
      return formHelper.current.subscribe(name, observerFn);
    },
    validateForm(_formData) {
      const elementNames = getElementNames();
      let isFormValid = true;
      const formData = _formData || formState;

      for (const name of elementNames) {
        const isElementValid = !validateFormElement({
          name,
          formData,
          validations: validations[name],
          elementRefs: getElementRefs(name),
        });

        if (!isElementValid) {
          isFormValid = false;
        }
      }

      return isFormValid;
    },
    reset() {
      formHelper.current.resetState();
      setSubmitAttempted(false);
    },
    setSubmitedAttempted() {
      setSubmitAttempted(true);
    },
    getSubmitedAttempted() {
      return submitAttempted;
    },
    getValidationMessage(name) {
      const elementRefs = getElementRefs(name);

      return elementRefs && elementRefs[0] ? elementRefs[0].validationMessage : '';
    },
  };
}
