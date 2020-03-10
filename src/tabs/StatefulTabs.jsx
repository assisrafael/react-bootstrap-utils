import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from './Tabs';

export function StatefulTabs({ initialTab, activeTab: _, tabs, ...props }) {
  const { getSelected, select } = useTabs(tabs, initialTab);

  return <Tabs tabs={tabs} {...props} activeTab={getSelected()} onSelect={select} />;
}

StatefulTabs.propTypes = {
  activeTab: PropTypes.any,
  tabs: PropTypes.arrayOf(PropTypes.object),
  initialTab: PropTypes.number,
};

function useTabs(tabs, initialTab) {
  const [activeTab, setActiveTab] = useState(initialTab < tabs.length ? initialTab : 0);

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
