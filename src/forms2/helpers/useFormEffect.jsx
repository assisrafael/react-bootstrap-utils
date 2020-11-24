import { useContext, useEffect } from 'react';
import { FormContext } from './useFormHelper';

export function useFormEffect(observerFn) {
  const formHelper = useContext(FormContext);

  useEffect(() => {
    const unsubscribe = formHelper.subscribe(observerFn);

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
