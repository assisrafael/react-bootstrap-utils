import React from 'react';
import PropTypes from 'prop-types';

import { formatClasses } from '../utils/attributes';
import { ListGroupItem } from './ListGroupItem';

export function ListGroup({ items, active, linked, bordered, horizontal, template, isDisabled, onSelect }) {
  const classes = formatClasses(['list-group', !bordered && 'list-group-flush', horizontal && 'list-group-horizontal']);

  const content = items.map((item, index) => (
    <ListGroupItem
      key={index}
      index={index}
      isActive={active === index}
      isDisabled={isDisabled(item)}
      item={item}
      linked={linked}
      onSelect={onSelect}
    >
      {template(item, index)}
    </ListGroupItem>
  ));

  if (linked) {
    return <div className={classes}>{content}</div>;
  }

  return <ul className={classes}>{content}</ul>;
}

ListGroup.defaultProps = {
  bordered: true,
  horizontal: false,
  isDisabled: () => {},
  linked: false,
  onSelect: () => {},
};

ListGroup.propTypes = {
  active: PropTypes.number,
  bordered: PropTypes.bool,
  horizontal: PropTypes.bool,
  isDisabled: PropTypes.func,
  items: PropTypes.array.isRequired,
  linked: PropTypes.bool,
  onSelect: PropTypes.func,
  template: PropTypes.func.isRequired,
};
