import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { handleInputChange, normalizeOptions, normalizeDisabled } from './helpers/form-helpers';
import { Dropdown } from '../mixed/Dropdown';
import { useOpenState } from '../utils/useOpenState';
import { formatClasses } from '../utils/attributes';
import { useFormControl } from './helpers/useFormControl';
import { isEmpty } from '../utils/types';

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
  const { getValue, setValue, register, isValid, getFormSubmitedAttempted, getFormData } = useFormControl(name);
  const value = getValue();

  const [searchValue, setSearchValue] = useState('');
  const items = normalizeOptions(options, getFormData(), searchValue);
  const _selectedItem = items.find((item) => item.value === value);

  const [selectedItem, setSelectedItem] = useState(_selectedItem);
  const { isOpen, open, close } = useOpenState();
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const registerRef = useCallback(register, []);
  const searchInputRef = useRef(null);

  const disabled = normalizeDisabled(_disabled, getFormData());

  const controlFeedback = getFormSubmitedAttempted() ? (isValid() ? 'is-valid' : 'is-invalid') : '';

  const onSearchInputType = useCallback(
    (_, nextSearchValue) => {
      setSearchValue(nextSearchValue);
      onSearch(nextSearchValue);
      open();

      if (nextSearchValue && value) {
        setValue(null);
      }
    },
    [onSearch, open, setValue, value]
  );

  const inputHandleChange = useMemo(
    () =>
      handleInputChange.bind(null, {
        update: onSearchInputType,
      }),
    [onSearchInputType]
  );

  const onSearchInputFocus = useCallback(() => {
    if (openOnFocus) {
      setTimeout(() => {
        open();
      }, 100);
    }
  }, [open, openOnFocus]);

  const onSearchInputBlur = useCallback(() => {
    if (isEmpty(searchValue) && value) {
      setValue('');
      setSelectedItem(null);
    }

    if (ignoreBlur) {
      searchInputRef.current.focus();
    } else {
      close();
      setFocus(false);
    }
  }, [close, ignoreBlur, searchValue, setValue, value]);

  const enableSearchInput = useCallback(() => {
    if (disabled) {
      return;
    }

    setFocus(true);
    setTimeout(() => {
      searchInputRef.current.focus();
    });
  }, [disabled]);

  const onSelectItem = useCallback(
    ({ value, label }) => {
      setValue(value);
      setSearchValue(label);
      setSelectedItem({ value, label });
      setIgnoreBlur(false);
      setTimeout(() => {
        setFocus(false);
        close();
      }, 60);
    },
    [close, setValue]
  );

  const updateSearchInputValidation = useCallback(() => {
    searchInputRef.current.setCustomValidity(controlFeedback === 'is-invalid' ? 'invalid' : '');
  }, [controlFeedback]);

  const clearSearchValue = useCallback(() => {
    if (isEmpty(value) && !isFocused) {
      setSearchValue('');
      setSelectedItem(null);
    }
  }, [isFocused, value]);

  useEffect(updateSearchInputValidation, [updateSearchInputValidation]);
  useEffect(clearSearchValue, [clearSearchValue]);

  return (
    <>
      <input
        {...{ placeholder, disabled }}
        type="search"
        ref={searchInputRef}
        className={formatClasses(['form-control form-autocomplete-search', isFocused ? '' : 'd-none', controlFeedback])}
        onChange={inputHandleChange}
        onFocus={onSearchInputFocus}
        onBlur={onSearchInputBlur}
        value={searchValue}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        autoComplete="off"
      />

      {!isFocused && (
        <div
          className={formatClasses(['form-control form-autocomplete-selected', controlFeedback])}
          disabled={disabled}
          onClick={enableSearchInput}
        >
          {selectedItem ? (template ? template(selectedItem.label) : selectedItem.label) : placeholder}
        </div>
      )}

      <input
        type="text"
        className={formatClasses(['form-control', 'd-none'])}
        {...{ name, required, id }}
        onChange={() => {}}
        value={getValue()}
        ref={registerRef}
      />

      <Dropdown
        className="form-autocomplete-dropdown"
        isOpen={isOpen()}
        items={items.filter(filter(searchValue))}
        onSelect={onSelectItem}
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
  template: (x) => x,
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
