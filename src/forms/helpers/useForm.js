import { useState, useEffect, useRef } from 'react';
import { useArrayValueMap } from '../../utils/useValueMap';
import { setValueByPath, deepClone, getValueByPath } from '../../utils/getters-setters';
import { validateFormElement } from './form-helpers';
import { debounce } from 'lodash-es';

function useFormState(initialState, { onChange, transform }) {
  const [formState, setFormState] = useState(initialState);
  const onChangeRef = useRef(debounce(onChange, 1000));
  const transformRef = useRef(
    debounce(
      (nextFormState, name) =>
        transform(nextFormState, name, (state) => {
          setFormState(state);
        }),
      500
    )
  );

  useEffect(() => {
    onChangeRef.current(formState);
  }, [formState]);

  return {
    getState() {
      return formState;
    },
    updateState(name, value) {
      setFormState((prevFormState) => {
        const nextFormState = nextState(prevFormState, name, value);

        setTimeout(() => {
          transformRef.current(nextFormState, name);
        });

        return nextFormState;
      });
    },
    resetState() {
      setFormState(initialState);
    },
  };
}

export function useForm(initialState, { validations, onChange, transform }) {
  const { getState, updateState, resetState } = useFormState(initialState, { onChange, transform });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { getAllKeys: getElementNames, get: getElementRefs, push: registerElementRef } = useArrayValueMap();

  const formState = getState();

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
      updateState(name, value);

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
      resetState();
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
