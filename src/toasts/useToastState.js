import { useState, useCallback, useEffect, useRef } from 'react';
import { useArrayValueMap } from '../utils/useValueMap';
import { TOASTS_VALID_TYPES, TOASTS_VALID_POSITIONS } from './toasts-helpers';

export function useToastState({ unique }) {
  const [nextId, setNextId] = useState(0);
  const timeoutRefs = useRef({});

  const { push, unset, get, reset } = useArrayValueMap(
    unique && {
      equalityComparator: (a) => (b) => a.message === b.message,
    }
  );

  const show = useCallback(
    (message, { type = 'info', autoClose = 5000, position = 'TOP_RIGHT' } = {}) => {
      if (!TOASTS_VALID_TYPES.includes(type)) {
        throw new Error(`Invalid toast type ${type}. Must be ${TOASTS_VALID_TYPES}`);
      }

      if (!TOASTS_VALID_POSITIONS.includes(position)) {
        throw new Error(`Invalid toast position ${position}. Must be ${TOASTS_VALID_POSITIONS}`);
      }

      const toastId = nextId;

      push(position, {
        id: toastId,
        message,
        type,
        position,
        closeControl: !autoClose,
      });

      if (typeof autoClose === 'number' && !isNaN(autoClose)) {
        const timeoutId = setTimeout(() => {
          close(position, toastId);
        }, autoClose);

        timeoutRefs.current[toastId] = { timeoutId, position };
        // setToastTimeout(toastId, timeout);
      }

      setNextId((prevId) => prevId + 1);

      return toastId;
    },
    [close, nextId, push]
  );

  const close = useCallback(
    (position, toastId) => {
      const { timeoutId } = timeoutRefs.current[toastId];

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      delete timeoutRefs.current[toastId];

      unset(position, (toast) => toast.id !== toastId);
    },
    [unset]
  );

  const closeAll = useCallback(() => {
    for (const [toastId, { position }] of Object.entries(timeoutRefs.current)) {
      close(position, toastId);
    }

    reset();
  }, [close, reset]);

  useEffect(
    () => closeAll,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    show,
    close,
    closeAll,
    get,
  };
}
