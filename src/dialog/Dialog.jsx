/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useOpenState } from '../utils/useOpenState';

import { safeClick } from '../utils/event-handlers';

import { ModalPortal } from './ModalPortal';
import { Modal } from './Modal';
import { hideModal } from './helpers';

export function useDialog({ onlyRenderContentIfIsOpen = true, ...props }) {
  const { isOpen, open, close } = useOpenState();
  const [dialogBodyProps, setDialogBodyProps] = useState({});
  const modalRef = useRef(null);

  const onClose = () => {
    hideModal(modalRef);
    close();
  };

  return {
    showDialog(_props) {
      setDialogBodyProps(_props);
      open();
    },
    closeDialog: onClose,
    DialogPortal() {
      return onlyRenderContentIfIsOpen && !isOpen() ? (
        <></>
      ) : (
        <ModalPortal isOpen={isOpen()} title={props.title}>
          <Modal {...props} modalRef={modalRef} dialogBodyProps={dialogBodyProps} onClose={onClose} isOpen={isOpen()} />
        </ModalPortal>
      );
    },
  };
}

export function Dialog({ children, onlyRenderContentIfIsOpen, ...props }) {
  const { isOpen, open, close } = useOpenState();

  const modalRef = useRef(null);

  const onClose = () => {
    hideModal(modalRef);
    close();
  };

  return (
    <React.Fragment>
      <DialogTrigger open={open}>{children}</DialogTrigger>

      {onlyRenderContentIfIsOpen && !isOpen() ? (
        <></>
      ) : (
        <ModalPortal isOpen={isOpen()} title={props.title}>
          <Modal {...props} modalRef={modalRef} onClose={onClose} isOpen={isOpen()} />
        </ModalPortal>
      )}
    </React.Fragment>
  );
}

Dialog.defaultProps = {
  onlyRenderContentIfIsOpen: true,
};

Dialog.propTypes = {
  afterOpen: PropTypes.func,
  children: PropTypes.node,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  centered: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  keyboard: PropTypes.bool,
  onlyRenderContentIfIsOpen: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl', '']),
  staticBackdrop: PropTypes.bool,
  title: PropTypes.node,
  useTimesClose: PropTypes.bool,
};

function DialogTrigger({ children, open }) {
  return React.cloneElement(children, {
    onClick: safeClick(open),
  });
}
