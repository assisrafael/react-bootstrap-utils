import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { stopPropagation } from '../utils/event-handlers';
import { formatClasses } from '../utils/attributes';

import { renderObjectOrFunction, showModal } from './helpers';

const ESCAPE_KEYCODE = 27;

export function Modal({
  afterOpen,
  body,
  centered,
  contentClassName,
  footer,
  isOpen,
  keyboard,
  modalRef,
  onClose,
  scrollable,
  size,
  staticBackdrop,
  title,
  useTimesClose,
  dialogBodyProps,
}) {
  const closeIfEscape = useCallback(
    (event) => {
      if (keyboard && event.which === ESCAPE_KEYCODE) {
        onClose();
      }
    },
    [keyboard, onClose]
  );

  useEffect(() => {
    const modalElement = modalRef.current;

    modalElement.addEventListener('keydown', closeIfEscape);

    return () => {
      modalElement.removeEventListener('keydown', closeIfEscape);
    };
  }, [keyboard, closeIfEscape, modalRef]);

  useEffect(() => {
    if (isOpen) {
      showModal(modalRef);
      afterOpen();
    } else {
      onClose();
    }
  }, [afterOpen, isOpen, modalRef, onClose]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      ref={modalRef}
      onClick={(e) => {
        e.stopPropagation();
        if (!staticBackdrop) {
          onClose();
        }
      }}
    >
      <div
        className={formatClasses([
          'modal-dialog',
          scrollable && 'modal-dialog-scrollable',
          centered && 'modal-dialog-centered',
          size && `modal-${size}`,
        ])}
        role="document"
        onClick={stopPropagation}
      >
        <div className={formatClasses(['modal-content', contentClassName])}>
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              {useTimesClose && (
                <button type="button" className="close" onClick={onClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              )}
            </div>
          )}
          <div className="modal-body">{renderObjectOrFunction(body, { ...dialogBodyProps, close: onClose })}</div>
          {footer && <div className="modal-footer">{renderObjectOrFunction(footer, { close: onClose })}</div>}
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  afterOpen: () => {},
  centered: true,
  dialogBodyProps: {},
  keyboard: true,
  scrollable: false,
  size: '',
  staticBackdrop: false,
  useTimesClose: true,
};

Modal.propTypes = {
  afterOpen: PropTypes.func,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  centered: PropTypes.bool,
  contentClassName: PropTypes.string,
  dialogBodyProps: PropTypes.object,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isOpen: PropTypes.bool,
  keyboard: PropTypes.bool,
  modalRef: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl', '']),
  staticBackdrop: PropTypes.bool,
  title: PropTypes.node,
  useTimesClose: PropTypes.bool,
};
