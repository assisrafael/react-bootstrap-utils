import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'js-var-type';

import { Dropdown } from '../mixed/Dropdown';
import { useOpenState } from '../utils/useOpenState';
import { formatClasses } from '../utils/attributes';

import { getSelectedOption, normalizeOptions } from './helpers/form-helpers';
import { useFormControl } from './helpers/useFormControl';
import { FormGroup } from './FormGroup';

export const FormDropdown = ({
  afterChange,
  childClassName,
  dropdownClassName,
  includeEmptyItem,
  itemClassName,
  menuClassName,
  name,
  options,
  placeholder,
  template,
  toggleIcon,
  trackBy,
}) => {
  const dropdownRef = useRef(null);

  const { getFormData, getValue, setValue: _setValue } = useFormControl(name);

  const value = getValue();
  const items = normalizeOptions(options, getFormData());
  const selectedItem = useMemo(() => getSelectedOption(value, items, trackBy), [items, trackBy, value]);

  const { isOpen: _isOpen, open, close } = useOpenState();
  const isOpen = _isOpen();

  const setValue = useCallback(
    (v) => {
      const previousValue = getValue();

      _setValue(v);

      if (isFunction(afterChange)) {
        afterChange(v, previousValue);
      }
    },
    [_setValue, afterChange, getValue]
  );

  const onSelectItem = useCallback(
    ({ value }) => {
      setValue(value);
      close();
    },
    [close, setValue]
  );

  const toggleDropdown = useCallback(() => (isOpen ? close() : open()), [close, isOpen, open]);

  useEffect(() => {
    /* The logic in this effect allows the user to close the dropdown menu when they click outside of the component. */
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
      <Dropdown
        isOpen={isOpen}
        items={includeEmptyItem ? [{ value: null, label: <div className="m-3"></div> }, ...items] : items}
        onSelect={onSelectItem}
        template={template}
        itemClassName={itemClassName}
        className={dropdownClassName}
        menuClassName={menuClassName}
      >
        <div
          className={formatClasses(['input-group justify-content-between form-control h-auto', childClassName])}
          onClick={toggleDropdown}
        >
          {selectedItem ? (
            template(selectedItem.label, selectedItem.value)
          ) : (
            <div className="text-muted">{placeholder}</div>
          )}
          {toggleIcon(isOpen)}
        </div>
      </Dropdown>
    </div>
  );
};

FormDropdown.defaultProps = {
  includeEmptyItem: true,
  menuClassName: 'p-0 w-100',
  template: (x) => x,
  toggleIcon: function toggleIcon(isOpen) {
    return (
      <div className="d-flex align-items-center px-2">
        <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      </div>
    );
  },
};

FormDropdown.propTypes = {
  afterChange: PropTypes.func,
  childClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  includeEmptyItem: PropTypes.bool,
  itemClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  template: PropTypes.func,
  toggleIcon: PropTypes.func,
  trackBy: PropTypes.string,
};

export function FormGroupDropdown(props) {
  return (
    <FormGroup {...props}>
      <FormDropdown {...props} />
    </FormGroup>
  );
}

FormGroupDropdown.propTypes = {
  afterChange: PropTypes.func,
  childClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  help: PropTypes.node,
  includeEmptyItem: PropTypes.bool,
  itemClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  placeholder: PropTypes.string,
  template: PropTypes.func,
  toggleIcon: PropTypes.func,
  trackBy: PropTypes.string,
};
