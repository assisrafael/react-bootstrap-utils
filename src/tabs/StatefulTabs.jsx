import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from './Tabs';
import { useSelectedItem } from '../utils/useSelectedItem';

export function StatefulTabs({ initialTab, activeTab: _, tabs, ...props }) {
  const { getSelected, select } = useSelectedItem(initialTab, tabs.length);
  useSelectedItem;

  return <Tabs tabs={tabs} {...props} activeTab={getSelected()} onSelect={select} />;
}

StatefulTabs.propTypes = {
  activeTab: PropTypes.any,
  tabs: PropTypes.arrayOf(PropTypes.object),
  initialTab: PropTypes.number,
};
