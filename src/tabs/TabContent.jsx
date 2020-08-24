import React from 'react';
import PropTypes from 'prop-types';

export function TabContent({ isActive, content }) {
  return (
    <div
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
      // id="home"
      role="tabpanel"
      // aria-labelledby="home-tab"
    >
      {content}
    </div>
  );
}

TabContent.propTypes = {
  isActive: PropTypes.bool,
  content: PropTypes.node,
};
