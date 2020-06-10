import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleInputChange, normalizeOptions, normalizeDisabled } from './helpers/form-helpers';
import { Dropdown } from '../mixed/Dropdown';
import { useOpenState } from '../utils/useOpenState';
import { formatClasses } from '../utils/attributes';
import { useFormControl } from './helpers/useFormControl';

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
  disabled: _disabled,
}) {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, open, close } = useOpenState();
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const { getValue, setValue, register, isValid, getFormSubmitedAttempted, getFormData } = useFormControl(name);
  const registerRef = useCallback(register, []);
  const searchInputRef = useRef(null);

  const items = normalizeOptions(options, getFormData(), searchValue);
  const value = getValue();
  const selectedItem = items.find((item) => item.value === value);
  const disabled = normalizeDisabled(_disabled, getFormData());

  const controlFeedback = `${getFormSubmitedAttempted() ? (isValid() ? 'is-valid' : 'is-invalid') : ''}`;

  useEffect(() => {
    searchInputRef.current.setCustomValidity(controlFeedback === 'is-invalid' ? 'invalid' : '');
  }, [controlFeedback]);

  return (
    <>
      <input
        {...{ placeholder, disabled }}
        type="text"
        ref={searchInputRef}
        className={`form-control ${isFocused ? '' : 'd-none'} ${controlFeedback}`}
        onChange={handleInputChange.bind(null, {
          update(_, nextSearchValue) {
            setSearchValue(nextSearchValue);
            onSearch(nextSearchValue);
            open();

            if (nextSearchValue && value) {
              setValue(null);
            }
          },
        })}
        onFocus={() => {
          if (openOnFocus) {
            setTimeout(() => {
              open();
            }, 100);
          }
        }}
        onBlur={() => {
          if (ignoreBlur) {
            searchInputRef.current.focus();
          } else {
            close();
            setFocus(false);
          }
        }}
        value={searchValue}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        autoComplete="off"
      />

      {!isFocused && (
        <div
          className={formatClasses(['form-control', controlFeedback])}
          disabled={disabled}
          onClick={() => {
            if (disabled) {
              return;
            }

            setFocus(true);
            setTimeout(() => {
              searchInputRef.current.focus();
            });
          }}
        >
          {selectedItem ? (template ? template(selectedItem.label) : selectedItem.label) : placeholder}
        </div>
      )}

      <input
        type="text"
        className={`form-control d-none`}
        {...{ name, required, id }}
        onChange={() => {}}
        value={getValue()}
        ref={registerRef}
      />
      <Dropdown
        isOpen={isOpen()}
        items={items.filter(filter(searchValue))}
        onSelect={({ value, label }) => {
          setValue(value);
          setSearchValue(label);
          setIgnoreBlur(false);
          setTimeout(() => {
            setFocus(false);
            close();
          }, 60);
        }}
        template={template}
        onClick={(e) => e.stopPropation()}
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
  required: PropTypes.bool,
  template: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
