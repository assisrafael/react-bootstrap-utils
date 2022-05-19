import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'js-var-type';

import { stopPropagation } from '../utils/event-handlers';
import { formatClasses } from '../utils/attributes';

const ESCAPE_KEYCODE = 27;

export function Modal({
  afterOpen,
  body,
  centered,
  contentClassName,
  footer,
  isOpen,
  keyboard,
  onClose,
  scrollable,
  size,
  staticBackdrop,
  title,
  useTimesClose,
  dialogBodyProps,
}) {
  const modalRef = useRef(null);
  const closeAndHide = useCallback(() => {
    hideModal(modalRef);
    onClose();
  }, [onClose]);
  const closeIfEscape = useCallback(
    (event) => {
      if (keyboard && event.which === ESCAPE_KEYCODE) {
        closeAndHide();
      }
    },
    [keyboard, closeAndHide]
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
      hideModal(modalRef);
    }
  }, [afterOpen, isOpen]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      ref={modalRef}
      onClick={(e) => {
        e.stopPropagation();
        if (!staticBackdrop) {
          closeAndHide();
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
        <div className={formatClasses(["modal-content", contentClassName])}>
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              {useTimesClose && (
                <button type="button" className="close" onClick={closeAndHide} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              )}
            </div>
          )}
          <div className="modal-body">{renderObjectOrFunction(body, { ...dialogBodyProps, close: closeAndHide })}</div>
          {footer && <div className="modal-footer">{renderObjectOrFunction(footer, { close: closeAndHide })}</div>}
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
  onClose: PropTypes.func,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl', '']),
  staticBackdrop: PropTypes.bool,
  title: PropTypes.node,
  useTimesClose: PropTypes.bool,
};

function hideModal(modalRef) {
  if (modalRef.current) {
    modalRef.current.style.display = 'none';
    modalRef.current.classList.remove('show');
  }

  hideModalBackdrop();
  enableBodyScroll();

  if (modalRef.current && modalRef.current.style.zIndex) {
    modalRef.current.style.zIndex = null;
  }
}

function enableBodyScroll() {
  const body = document.querySelector('body');

  body.classList.remove('modal-open');
}

function showModal(modalRef) {
  if (!modalRef.current) {
    return;
  }

  disableBodyScroll();
  showModalBackdrop();

  if (countModals() > 0) {
    modalRef.current.style.zIndex = getZIndex(modalRef.current) + countModals() * 20;
  }

  modalRef.current.style.display = 'block';
  modalRef.current.classList.add('show');

  modalRef.current.focus();
}

function renderObjectOrFunction(content, params) {
  return isFunction(content) ? content(params) : content;
}

function showModalBackdrop() {
  const backdrop = getModalBackdrop();

  backdrop.classList.remove('d-none');

  if (countModals() > 0) {
    backdrop.style.zIndex = getZIndex(backdrop) + 20;
  }
}

function hideModalBackdrop() {
  const backdrop = getModalBackdrop();

  if (backdrop.style.zIndex) {
    backdrop.style.zIndex -= 20;
  }

  if (countModals() === 0) {
    backdrop.classList.add('d-none');
    backdrop.style.zIndex = null;
  }
}

function getModalBackdrop() {
  const body = document.querySelector('body');
  let backdrop = document.querySelector('.modal-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');

    backdrop.classList.add('modal-backdrop', 'fade', 'show', 'd-none');

    body.appendChild(backdrop);
  }

  return backdrop;
}

function countModals() {
  return document.querySelectorAll('#modal-portals .modal.show').length;
}

function disableBodyScroll() {
  if (countModals() != 0) {
    return;
  }

  const body = document.querySelector('body');

  body.classList.add('modal-open');
}

function getZIndex(elem) {
  return parseInt(window.getComputedStyle(elem).zIndex, 10);
}
