import React from 'react';

export const ToastsContext = React.createContext(null);

export const toastPositions = [
  {
    name: 'TOP_LEFT',
    className: 'top-left',
  },
  {
    name: 'TOP_RIGHT',
    className: 'top-right',
  },
  {
    name: 'BOTTOM_LEFT',
    className: 'bottom-left',
  },
  {
    name: 'BOTTOM_RIGHT',
    className: 'bottom-right',
  },
];

export const toastsDefaultStylesByPosition = {
  TOP_RIGHT: {
    top: '25px',
    right: '25px',
  },
  TOP_LEFT: {
    top: '25px',
    left: '25px',
  },
  BOTTOM_RIGHT: {
    right: '25px',
    bottom: '25px',
  },
  BOTTOM_LEFT: {
    left: '25px',
    bottom: '25px',
  },
};
