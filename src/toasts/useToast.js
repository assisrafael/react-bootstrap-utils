import { useState } from 'react';
import { useArrayValueMap } from '../utils/useValueMap';

export function useToast({ unique }) {
  const [nextId, setNextId] = useState(0);
  const { push, unset, get } = useArrayValueMap(
    unique && {
      equalityComparator: (a) => (b) => {
        return a.message === b.message;
      },
    }
  );

  function close(position, toastId) {
    unset(position, (toast) => {
      return toast.id !== toastId;
    });
  }

  return {
    show(message, { type = 'info', autoClose = 5000, position = 'TOP_RIGHT' } = {}) {
      if (!['info', 'success', 'danger', 'warning'].includes(type)) {
        throw new Error(`Invalid toast type ${type}. Must be 'info', 'success', 'danger' or 'warning'`);
      }

      const toastId = nextId;

      push(position, {
        id: toastId,
        message,
        type,
        position,
        closeControl: !autoClose,
      });

      if (autoClose && typeof autoClose === 'number' && !isNaN(autoClose)) {
        setTimeout(() => {
          close(position, toastId);
        }, autoClose);
      }

      setNextId((prevId) => prevId + 1);
    },
    close,
    get,
  };
}
