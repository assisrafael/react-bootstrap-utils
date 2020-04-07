import { useContext } from 'react';
import { FormContext } from './form-helpers';

export function useFormData() {
  const formState = useContext(FormContext);

  return formState.getFormData();
}
