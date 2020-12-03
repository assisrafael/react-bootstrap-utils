import { useContext } from 'react';

import { ToastsContext } from './toasts-helpers';

export function useToasts() {
  const toastsState = useContext(ToastsContext);

  return {
    /**
     * showToast
     * @param {string} message
     * @param {object} options Configurations object
     * @param {string} options.type toast color based on bootstrap theme ('info' - default, 'success', 'danger', 'warning')
     * @param {number} options.autoClose miliseconds to automatically close toast (default 5000)
     * @param {string} options.position toast position ('TOP_LEFT', 'TOP_RIGHT' - default, 'BOTTOM_LEFT', 'BOTTOM_RIGHT')
     *
     * @returns {func} a closeToast function to close the opened toast
     */
    showToast(message, options) {
      const { type = 'info', autoClose = 5000, position = 'TOP_RIGHT' } = options || {};
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
