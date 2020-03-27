import { useState } from 'react';
import { validateFormElement } from './form-helpers';
import { useArrayValueMap } from '../../utils/useValueMap';

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
