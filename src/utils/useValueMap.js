import { useState } from 'react';

export function useValueMap() {
  const [valueMap, updateValueMap] = useState({});

  function setValue(key, value) {
    updateValueMap((prevValueMap) => {
      return {
        ...prevValueMap,
        [key]: value,
      };
    });
  }

  function getValue(key) {
    return valueMap[key];
  }

  return {
    setValue,
    getValue,
    setValueIfUnset(key, value) {
      if (!getValue(key)) {
        setValue(key, value);
      }
    },
  };
}
