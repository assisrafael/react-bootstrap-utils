import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'js-var-type';

import { useSelectedItem } from '../utils/useSelectedItem';

import { Tabs } from './Tabs';

export function StatefulTabs({ initialTab, tabs, onSelect, ...props }) {
  const { getSelected, select } = useSelectedItem(initialTab, tabs.length);

  const _onSelect = useCallback(
    (index) => {
      select(index);

      if (isFunction(onSelect)) {
        return onSelect(index);
      }
    },
    [onSelect, select]
  );

  return <Tabs tabs={tabs} {...props} activeTab={getSelected()} onSelect={_onSelect} />;
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
