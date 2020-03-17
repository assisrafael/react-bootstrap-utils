import { useState } from 'react';

export function useModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  return {
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
    isOpen() {
      return modalIsOpen;
    },
  };
}

export function handleClick(action, close) {
  return () => {
    const res = action();

    if (!res || !res.then) {
      close();
      return;
    }

    res.then(() => close());
  };
}
