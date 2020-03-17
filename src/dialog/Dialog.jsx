import React from 'react';
import PropTypes from 'prop-types';
import { ModalPortal } from './ModalPortal';
import { Modal } from './Modal';
import { useModal } from './modal-helpers';

export function Dialog({ children, ...props }) {
  const { isOpen, open, close } = useModal();

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
