import React from 'react';
import PropTypes from 'prop-types';

import { useSelectedItem } from '../utils/useSelectedItem';

import { ListGroup } from './ListGroup';

export function StatefulListGroup({ initialItem, items, active: _, ...props }) {
  const { getSelected, select } = useSelectedItem(initialItem, items.length);

  return <ListGroup items={items} active={getSelected()} onSelect={select} {...props} />;
}

StatefulListGroup.propTypes = {
  active: PropTypes.any,
  items: PropTypes.arrayOf(PropTypes.object),
  initialItem: PropTypes.number,
};
