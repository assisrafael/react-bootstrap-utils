import { useState } from 'react';

export function useOpenState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
    isOpen() {
      return isOpen;
    },
  };
}
