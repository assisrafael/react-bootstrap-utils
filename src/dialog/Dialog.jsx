import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useOpenState } from '../utils/useOpenState';

import { safeClick } from '../utils/event-handlers';

import { ModalPortal } from './ModalPortal';
import { Modal } from './Modal';

export function useDialog(props) {
  const { isOpen, open, close } = useOpenState();
  const [dialogBodyProps, setDialogBodyProps] = useState({});

  return {
    showDialog(_props) {
      setDialogBodyProps(_props);
      open();
    },
    DialogPortal() {
      return (
        <ModalPortal isOpen={isOpen()} title={props.title}>
          <Modal {...props} dialogBodyProps={dialogBodyProps} onClose={close} isOpen={isOpen()} />
        </ModalPortal>
      );
    },
  };
}

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
  afterOpen: PropTypes.func,
  children: PropTypes.node,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  centered: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  keyboard: PropTypes.bool,
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
