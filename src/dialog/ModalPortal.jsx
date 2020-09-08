import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export function ModalPortal({ children, title, isOpen }) {
  const [container, setContainer] = useState();

  useEffect(() => {
    const modalPortalsElem = getModalPortalsElem();

    if (!container) {
      const containerElem = document.createElement('div');

      containerElem.dataset.title = title;

      modalPortalsElem.appendChild(containerElem);
      setContainer(containerElem);
    }

    return () => {
      if (!container) {
        return;
      }

      modalPortalsElem.removeChild(container);
    };
  }, [container, title]);

  //FIXME: prop to define if modal will be always included into DOM
  if (!container || !isOpen) {
    return '';
  }

  return ReactDOM.createPortal(children, container);
}

ModalPortal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

function getModalPortalsElem() {
  let modalPortalsElem = document.querySelector('#modal-portals');

  if (!modalPortalsElem) {
    const body = document.querySelector('body');

    modalPortalsElem = document.createElement('div');
    modalPortalsElem.id = 'modal-portals';
    body.appendChild(modalPortalsElem);
  }

  return modalPortalsElem;
}
