import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEmptyLike, isFunction } from 'js-var-type';

import { Dropdown } from '../mixed/Dropdown';
import { useOpenState } from '../utils/useOpenState';
import { formatClasses } from '../utils/attributes';

import { handleInputChange, normalizeOptions, booleanOrFunction } from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';
import { FormGroup } from './FormGroup';

export function FormAutocomplete({
  onSearch,
  options,
  required: _required,
  id,
  placeholder,
  name,
  openOnFocus,
  template,
  filter,
  disabled: _disabled,
  afterChange,
  allowUnlistedValue,
}) {
  const {
    getValue,
    setValue: _setValue,
    register,
    isValid,
    getFormSubmitedAttempted,
    getFormData,
  } = useFormControl(name);
  const value = getValue();

  const setValue = useCallback(
    (v) => {
      _setValue(v);
      if (isFunction(afterChange)) {
        afterChange(v);
      }
    },
    [_setValue, afterChange]
  );

  const [searchValue, setSearchValue] = useState('');
  const items = normalizeOptions(options, getFormData(), searchValue);
  const _selectedItem = items.find((item) => item.value === value);

  const [selectedItem, setSelectedItem] = useState(_selectedItem);
  const { isOpen, open, close } = useOpenState();
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const searchInputRef = useRef(null);

  const registerRef = useCallback(register, [register]);
  const disabled = booleanOrFunction(_disabled, getFormData());
  const required = booleanOrFunction(_required, getFormData());

  const controlFeedback = getFormSubmitedAttempted() ? (isValid() ? 'is-valid' : 'is-invalid') : '';

  const updateSearchInputValidation = useCallback(() => {
    searchInputRef.current.setCustomValidity(controlFeedback === 'is-invalid' ? 'invalid' : '');
  }, [controlFeedback]);

  const clearSearchValue = useCallback(() => {
    if (isEmptyLike(value) && !isFocused) {
      setSearchValue('');
      setSelectedItem(null);
    }
  }, [isFocused, value]);

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
    if (isEmptyLike(searchValue) && value) {
      setValue('');
      setSelectedItem(null);
      updateSearchInputValidation();
    } else if (isEmptyLike(selectedItem) && !isEmptyLike(searchValue) && allowUnlistedValue) {
      onSelectItem({ value: searchValue, label: searchValue });
    }

    if (ignoreBlur) {
      searchInputRef.current.focus();
    } else {
      close();
      setFocus(false);
    }
  }, [
    close,
    ignoreBlur,
    searchValue,
    setValue,
    updateSearchInputValidation,
    value,
    onSelectItem,
    allowUnlistedValue,
    selectedItem,
  ]);

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

  useEffect(updateSearchInputValidation, [updateSearchInputValidation]);
  useEffect(clearSearchValue, [clearSearchValue]);
  useEffect(() => {
    if (selectedItem?.label) {
      setSearchValue(selectedItem?.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  afterChange: PropTypes.func,
  allowUnlistedValue: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
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
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  template: PropTypes.func,
  type: PropTypes.string,
};

export function FormGroupAutocomplete(props) {
  return (
    <FormGroup {...props}>
      <FormAutocomplete {...props} />
    </FormGroup>
  );
}

FormGroupAutocomplete.propTypes = {
  afterChange: PropTypes.func,
  allowUnlistedValue: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filter: PropTypes.func,
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  openOnFocus: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  template: PropTypes.func,
  type: PropTypes.string,
};
