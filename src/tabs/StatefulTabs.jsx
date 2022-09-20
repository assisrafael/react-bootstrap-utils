import React from 'react';
import PropTypes from 'prop-types';

import { useSelectedItem } from '../utils/useSelectedItem';

import { Tabs } from './Tabs';

export function StatefulTabs({ initialTab, tabs, ...props }) {
  const { getSelected, select } = useSelectedItem(initialTab, tabs.length);

  return <Tabs tabs={tabs} {...props} activeTab={getSelected()} onSelect={select} />;
}

StatefulTabs.propTypes = {
  bordered: PropTypes.bool,
  initialTab: PropTypes.number,
  onlyRenderActiveTab: PropTypes.bool,
  onSelect: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
      hideIf: PropTypes.func,
    })
  ).isRequired,
  vertical: PropTypes.bool,
};
