import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange, normalizeOptions } from './form-helpers';
import { Dropdown } from '../mixed/Dropdown';
import { useOpenState } from '../utils/useOpenState';

export function FormAutocomplete({
  onSearch,
  options,
  required,
  id,
  placeholder,
  name,
  openOnFocus,
  template,
  filter,
}) {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, open, close } = useOpenState();
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const formState = useContext(FormContext);
  const inputRef = useRef(null);

  useEffect(() => {
    formState.register(name, inputRef.current);
  }, []);

  return (
    <>
      <input
        {...{ required, name, id, placeholder }}
        type="text"
        ref={inputRef}
        className="form-control"
        onChange={handleInputChange.bind(null, {
          update(_, value) {
            setSearchValue(value);
            onSearch(value);
            open();

            if (formState.getValue(name)) {
              formState.update(name, null);
            }
          },
        })}
        onFocus={() => {
          if (openOnFocus) {
            setTimeout(() => {
              open();
            }, 250);
          }
        }}
        onBlur={() => {
          if (ignoreBlur) {
            inputRef.current.focus();
          } else {
            close();
          }
        }}
        value={searchValue}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        autoComplete="off"
      />
      <Dropdown
        isOpen={isOpen()}
        items={normalizeOptions(options, FormData).filter(filter(searchValue))}
        onSelect={({ value, label }) => {
          formState.update(name, value);
          setSearchValue(label);
          close();
        }}
        template={template}
        onTouchStart={() => setIgnoreBlur(true)}
        onMouseEnter={() => setIgnoreBlur(true)}
        onMouseLeave={() => setIgnoreBlur(false)}
      />
    </>
  );
}

FormAutocomplete.defaultProps = {
  openOnFocus: false,
  onSearch: () => {},
  filter: (_searchValue) => (item) => {
    const itemValue = JSON.stringify(item.label).toLowerCase();
    const searchValue = _searchValue.toLowerCase();

    return itemValue.includes(searchValue);
  },
};

FormAutocomplete.propTypes = {
  filter: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  openOnFocus: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.any,
  template: PropTypes.func,
  type: PropTypes.string,
};
