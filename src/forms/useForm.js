import { useState } from 'react';
import { useArrayValueMap } from '../utils/useValueMap';
import { validateFormElement } from './form-helpers';

export function useForm(initialState, validations) {
  const [formState, setFormState] = useState(initialState);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { getAllKeys: getElementNames, get: getElementRefs, push: registerElementRef } = useArrayValueMap();

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
      setFormState((prevFormState) => {
        const nextState = {
          ...prevFormState,
          [name]: value,
        };

        return nextState;
      });

      if (validations) {
        this.validateForm({
          ...formState,
          [name]: value,
        });
      }
    },
    getFormData() {
      return formState;
    },
    getValue(name) {
      return formState[name];
    },
    reset() {
      setFormState(initialState);
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

      for (let name of elementNames) {
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
