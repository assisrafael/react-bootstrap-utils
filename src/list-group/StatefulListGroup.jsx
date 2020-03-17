import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from './ListGroup';
import { useSelectedItem } from '../utils/useSelectedItem';

export function StatefulListGroup({ initialItem, items, active: _, ...props }) {
  const { getSelected, select } = useSelectedItem(initialItem, items.length);
  useSelectedItem;

  return <ListGroup items={items} active={getSelected()} onSelect={select} {...props} />;
}

StatefulListGroup.propTypes = {
  active: PropTypes.any,
  items: PropTypes.arrayOf(PropTypes.object),
  initialItem: PropTypes.number,
};
