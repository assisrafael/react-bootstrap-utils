import { useState } from 'react';

export function useSelectedItem(defaultIndex, collectionSize) {
  const [selectedItem, setSelectedItem] = useState(defaultIndex < collectionSize ? defaultIndex : 0);

  return {
    getSelected() {
      return selectedItem;
    },
    select(index) {
      if (index >= collectionSize) {
        throw new Error('Invalid tab');
      }

      setSelectedItem(index);
    },
  };
}
