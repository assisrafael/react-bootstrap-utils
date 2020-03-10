import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from './Tabs';

export function StatefulTabs({ activeTab: _, tabs, ...props }) {
  const { getSelected, select } = useTabs(tabs);

  return <Tabs tabs={tabs} {...props} activeTab={getSelected()} onSelect={select} />;
}

StatefulTabs.propTypes = {
  activeTab: PropTypes.any,
  tabs: PropTypes.arrayOf(PropTypes.object),
};

function useTabs(tabs) {
  const [activeTab, setActiveTab] = useState(0);

  return {
    getSelected() {
      return activeTab;
    },
    select(index) {
      if (index >= tabs.length) {
        throw new Error('Invalid tab');
      }

      setActiveTab(index);
    },
  };
}
