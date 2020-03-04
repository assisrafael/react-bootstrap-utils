import React, { useState } from 'react';

export const FormContext = React.createContext(null);

export function useForm(initialState) {
  const [formState, setFormState] = useState(initialState);

  return {
    update(name, value) {
      setFormState({
        ...formState,
        [name]: value,
      });
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
  };
}

export function handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  return { name, value };
}
