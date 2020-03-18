import React from 'react';
import PropTypes from 'prop-types';
import { ModalPortal } from './ModalPortal';
import { Modal } from './Modal';
import { useOpenState } from '../utils/useOpenState';

export function Dialog({ children, ...props }) {
  const { isOpen, open, close } = useOpenState();

  return (
    <React.Fragment>
      <DialogTrigger open={open}>{children}</DialogTrigger>

      <ModalPortal isOpen={isOpen()}>
        <Modal {...props} onClose={close} isOpen={isOpen()} />
      </ModalPortal>
    </React.Fragment>
  );
}

Dialog.propTypes = {
  content: PropTypes.any,
  children: PropTypes.any,
};

function DialogTrigger({ children, open }) {
  return React.cloneElement(children, {
    onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      open();
    },
  });
}
