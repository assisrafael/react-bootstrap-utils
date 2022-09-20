import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'js-var-type';

import { formatClasses } from '../utils/attributes';

import { TabHeader } from './TabHeader';
import { TabContent } from './TabContent';

export function Tabs({ vertical, tabs: _tabs, activeTab, onlyRenderActiveTab, bordered, onSelect, justified, fill }) {
  const tabs = useMemo(() => _tabs.filter((tab) => (isFunction(tab?.hideIf) ? !tab.hideIf() : true)), [_tabs]);

  if (activeTab >= tabs.length) {
    // eslint-disable-next-line no-console
    console.error(`Invalid tab selected: ${activeTab}. The first tab will be selected instead.`);
    activeTab = 0;
  }

  return (
    <div className={formatClasses(['custom-tabs-container', vertical && 'd-flex'])}>
      <div className="tabs-navigation">
        <ul
          className={formatClasses([
            'nav',
            vertical ? 'nav-pills flex-column' : 'nav-tabs',
            justified && 'nav-justified',
            fill && 'nav-fill',
          ])}
          id="myTab"
          role="tablist"
        >
          {tabs.map((tab, tabIndex) => (
            <TabHeader
              key={tabIndex}
              index={tabIndex}
              isActive={tabIndex === activeTab}
              title={tab.title}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </div>

      <div
        className={formatClasses([
          'tab-content',
          vertical ? 'flex-fill ml-3' : bordered ? 'border-left border-right border-bottom p-2' : 'py-2',
        ])}
        // id="myTabContent"
      >
        {onlyRenderActiveTab ? (
          <TabContent isActive={true} content={tabs[activeTab] && tabs[activeTab].content} />
        ) : (
          tabs.map((tab, tabIndex) => (
            <TabContent key={tabIndex} isActive={tabIndex === activeTab} content={tab.content} />
          ))
        )}
      </div>
    </div>
  );
}

Tabs.defaultProps = {
  activeTab: 0,
  bordered: false,
  fill: false,
  justified: false,
  onlyRenderActiveTab: false,
  onSelect: () => {},
  vertical: false,
};

Tabs.propTypes = {
  activeTab: PropTypes.number,
  bordered: PropTypes.bool,
  fill: PropTypes.bool,
  justified: PropTypes.bool,
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
