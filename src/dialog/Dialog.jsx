import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalPortal } from './ModalPortal';
import { Modal } from './Modal';
import { useOpenState } from '../utils/useOpenState';
import { safeClick } from '../utils/event-handlers';

export function Dialog({ children, ...props }) {
  const { isOpen, open, close } = useOpenState();

  return (
    <React.Fragment>
      <DialogTrigger open={open}>{children}</DialogTrigger>

      <ModalPortal isOpen={isOpen()} title={props.title}>
        <Modal {...props} onClose={close} isOpen={isOpen()} />
      </ModalPortal>
    </React.Fragment>
  );
}

Dialog.propTypes = {
  children: PropTypes.node,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  centered: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  keyboard: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl', '']),
  staticBackdrop: PropTypes.bool,
  title: PropTypes.node,
};

function DialogTrigger({ children, open }) {
  return React.cloneElement(children, {
    onClick: safeClick(open),
  });
}
