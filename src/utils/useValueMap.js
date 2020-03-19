import { useState } from 'react';

export function useValueMap() {
  const [valueMap, updateValueMap] = useState({});

  function setValue(key, _value) {
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
  }

  function getValue(key) {
    return valueMap[key];
  }

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
  };
}

export function useArrayValueMap({ unique = true, equalityComparator = (a) => (b) => a === b } = {}) {
  const { getAllKeys, getValue, setValue } = useValueMap();

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
      setValue(key, (prevValues) => {
        return prevValues.filter(filterfn);
      });
    },
    get: getValue,
    getAllKeys,
  };
}
