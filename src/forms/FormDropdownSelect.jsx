import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEmptyLike, isFunction } from 'js-var-type';

import { Dropdown } from '../mixed/Dropdown';
import { useOpenState } from '../utils/useOpenState';
import { formatClasses } from '../utils/attributes';

import { handleInputChange, normalizeOptions, booleanOrFunction } from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';

export const FormDropdown = ({
  afterChange,
  disabled: _disabled,
  id,
  className,
  childClassName,
  itemClassName,
  name,
  options,
  placeholder,
  required: _required,
  template,
  dropdownClass, //permitir customização da classe do Dropdown
}) => {
  const dropdownRef = useRef(null);

  const { getFormData, getValue, handleOnChangeFactory, setValue: _setValue } = useFormControl(name);

  const value = getValue();
  // const registerRef = useCallback(register, [register]);

  const items = normalizeOptions(options, getFormData()); //Melhorar. usar useMemo por exemplo
  const _selectedItem = items.find((item) => item.value === value); //Melhorar. usar useMemo por exemplo

  // const [selectedItem, setSelectedItem] = useState(_selectedItem);
  const { isOpen: _isOpen, open, close } = useOpenState();
  const isOpen = _isOpen();

  const setValue = useCallback(
    (v) => {
      _setValue(v);
      if (isFunction(afterChange)) {
        // Deixar essa lógica por responsabilidade do handleOnChangeFactory
        afterChange(v);
      }
    },
    [_setValue, afterChange]
  );

  // const disabled = booleanOrFunction(_disabled, getFormData());
  // const required = booleanOrFunction(_required, getFormData());

  const onSelectItem = useCallback(
    ({ value, label }) => {
      setValue(value);
      // setSelectedItem({ value, label });
      close();
    },
    [close, setValue]
  );

  const toggleDropdown = useCallback(() => (isOpen ? close() : open()), [close, isOpen, open]);

  const clear = useCallback(() => {
    setValue(null);
    // setSelectedItem(null);
  }, [setValue]);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [close, isOpen, open]);

  return (
    <div ref={dropdownRef}>
      <Dropdown isOpen={isOpen} items={items} onSelect={onSelectItem} template={template} itemClassName={itemClassName}>
        <div
          className={formatClasses([
            'form-control',
            'd-flex',
            'align-items-center',
            'justify-content-between',
            'h-auto',
          ])}
          onClick={toggleDropdown}
        >
          {_selectedItem ? (
            <>
              <div>{template ? template(_selectedItem) : _selectedItem?.label}</div>
              {isOpen && (
                <div onClick={clear}>
                  {/* Permitir customização do dev */}
                  <i className="bi bi-x"></i>
                </div>
              )}
            </>
          ) : (
            <div className="text-muted">{placeholder}</div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
