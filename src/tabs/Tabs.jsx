import React from 'react';
import PropTypes from 'prop-types';
import { TabHeader } from './TabHeader';
import { TabContent } from './TabContent';

export function Tabs({ vertical, tabs, activeTab, onlyRenderActiveTab, bordered, onSelect }) {
  if (activeTab >= tabs.length) {
    console.warn('Invalid tab selected:', activeTab);
  }

  return (
    <div className={`custom-tabs-container ${vertical ? 'd-flex' : ''}`}>
      <div className="tabs-navigation">
        <ul className={`nav ${vertical ? 'nav-pills flex-column' : 'nav-tabs'}`} id="myTab" role="tablist">
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
        className={`tab-content ${
          vertical ? 'flex-fill ml-3' : `${bordered ? 'border-left border-right border-bottom p-2' : 'py-2'}`
        }`}
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
  vertical: false,
  bordered: false,
  activeTab: 0,
  onlyRenderActiveTab: false,
  onSelect: () => {},
};

Tabs.propTypes = {
  vertical: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.object),
  activeTab: PropTypes.number,
  onlyRenderActiveTab: PropTypes.bool,
  bordered: PropTypes.bool,
  onSelect: PropTypes.func,
};
