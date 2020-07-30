import { useContext } from 'react';
import { ToastsContext } from './toasts-helpers';

export function useToasts() {
  const toastsState = useContext(ToastsContext);

  return {
    showToast(message, { type = 'info', autoClose = 5000, position = 'TOP_RIGHT' } = {}) {
      const toastId = toastsState.show(message, { type, autoClose, position });

      return function closeToast() {
        toastsState.close(position, toastId);
      };
    },
    closeAllToasts() {
      toastsState.closeAll();
    },
  };
}
