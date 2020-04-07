import { useState, useEffect, useCallback } from 'react';
import { useArrayValueMap } from '../../utils/useValueMap';
import { setValueByPath, deepClone, getValueByPath } from '../../utils/getters-setters';
import { validateFormElement } from './form-helpers';
import { debounce } from 'lodash-es';

export function useForm(initialState, { validations, onChange, transform }) {
  const [formState, setFormState] = useState(initialState);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { getAllKeys: getElementNames, get: getElementRefs, push: registerElementRef } = useArrayValueMap();

  if (onChange) {
    const _onChange = useCallback(debounce(onChange, 500), []);

    useEffect(() => {
      _onChange(formState);
    }, [formState]);
  }

  return {
    register(name, elementRef) {
      registerElementRef(name, elementRef);

      if (validations) {
        validateFormElement({
          name,
          formData: formState,
          validations: validations[name],
          elementRefs: [elementRef],
        });
      }
    },
    update(name, value) {
      setFormState((prevFormState) => transform(nextState(prevFormState, name, value), name));

      if (validations) {
        this.validateForm(nextState(formState, name, value));
      }
    },
    getFormData() {
      return formState;
    },
    getValue(name) {
      return getValueByPath(formState, name);
    },
    reset() {
      setFormState(initialState);
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
  };
}

function nextState(previousState, path, value) {
  return setValueByPath(deepClone(previousState), path, value);
}
