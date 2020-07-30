import { useState, useCallback } from 'react';

export function useValueMap() {
  const [valueMap, updateValueMap] = useState({});

  const setValue = useCallback((key, _value) => {
    updateValueMap((prevValueMap) => {
      let value = _value;

      if (typeof value === 'function') {
        value = value(prevValueMap[key]);
      }

      return {
        ...prevValueMap,
        [key]: value,
      };
    });
  }, []);

  const getValue = useCallback((key) => valueMap[key], [valueMap]);

  return {
    setValue,
    getValue,
    getAllKeys() {
      return Object.keys(valueMap);
    },
    setValueIfUnset(key, value) {
      if (!getValue(key)) {
        setValue(key, value);
      }
    },
    unsetKey(key) {
      updateValueMap(({ [key]: _, ...prevValueMap }) => prevValueMap);
    },
    reset() {
      updateValueMap({});
    },
  };
}

export function useArrayValueMap({ unique = true, equalityComparator = (a) => (b) => a === b } = {}) {
  const { getAllKeys, getValue, setValue, reset } = useValueMap();

  return {
    push(key, value) {
      setValue(key, (prevValues) => {
        let values = prevValues;

        if (!values) {
          values = [];
        }

        if (!unique || !values.find(equalityComparator(value))) {
          values.push(value);
        }

        return values;
      });
    },
    unset(key, filterfn) {
      setValue(key, (prevValues) => prevValues && prevValues.filter(filterfn));
    },
    get: getValue,
    getAllKeys,
    reset,
  };
}
