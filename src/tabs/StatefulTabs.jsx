import React from 'react';
import PropTypes from 'prop-types';
import { useSelectedItem } from '../utils/useSelectedItem';
import { Tabs } from './Tabs';

export function StatefulTabs({ initialTab, activeTab: _, tabs, ...props }) {
  const { getSelected, select } = useSelectedItem(initialTab, tabs.length);

  return <Tabs tabs={tabs} {...props} activeTab={getSelected()} onSelect={select} />;
}

StatefulTabs.propTypes = {
  activeTab: PropTypes.any,
  initialTab: PropTypes.number,
  onlyRenderActiveTab: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.object),
};
