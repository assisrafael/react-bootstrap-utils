import React from 'react';
import PropTypes from 'prop-types';
import { safeClick } from '../utils/event-handlers';

export function ListGroupItem({ index, isActive, children, linked, isDisabled, onSelect }) {
  const classes = [
    'list-group-item',
    isActive && 'active',
    isDisabled && 'disabled',
    linked && 'list-group-item-action',
  ]
    .filter((v) => v)
    .join(' ');

  if (linked) {
    return (
      <a href="#" className={classes} onClick={safeClick(onSelect, index)}>
        {children}
      </a>
    );
  }

  return (
    <li className={classes} onClick={safeClick(onSelect, index)}>
      {children}
    </li>
  );
}

ListGroupItem.defaultProps = {
  isActive: false,
};

ListGroupItem.propTypes = {
  children: PropTypes.element,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  linked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  template: PropTypes.func.isRequired,
};
