import { useContext, useEffect } from 'react';

import { FormContext } from './useFormHelper';

export function useFormEffect(name, observerFn) {
  const formHelper = useContext(FormContext);

  useEffect(() => {
    const unsubscribe = formHelper.subscribe(name, observerFn);

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
