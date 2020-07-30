import React from 'react';

export const ToastsContext = React.createContext(null);

export const TOASTS_VALID_POSITIONS = ['TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'];

export const TOASTS_VALID_TYPES = ['info', 'success', 'danger', 'warning'];

export const TOASTS_CLASSNAME_BY_POSITION = [
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

export const TOASTS_DEFAULT_STYLE = {
  position: 'fixed',
  zIndex: 9999,
  maxWidth: '50%',
};

export const TOASTS_DEFAULT_STYLES_BY_POSITION = {
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
