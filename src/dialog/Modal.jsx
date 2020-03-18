import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { stopPropagation } from '../utils/event-handlers';

const ESCAPE_KEYCODE = 27;

export function Modal({ title, body, onClose, isOpen, footer, staticBackdrop, scrollable, centered, size, keyboard }) {
  const modalRef = useRef(null);

  function closeIfEscape(event) {
    if (keyboard && event.which === ESCAPE_KEYCODE) {
      onClose();
    }
  }

  useEffect(() => {
    modalRef.current.addEventListener('keydown', closeIfEscape);

    return () => {
      modalRef.current.removeEventListener('keydown', closeIfEscape);
    };
  }, [keyboard]);

  useEffect(() => {
    const body = document.querySelector('body');

    if (isOpen) {
      body.classList.add('modal-open');
      modalRef.current.style.display = 'block';
      modalRef.current.classList.add('show');
      modalRef.current.focus();
    } else {
      body.classList.remove('modal-open');
      modalRef.current.style.display = 'none';
      modalRef.current.classList.remove('show');
    }
  }, [isOpen]);

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
        className={`modal-dialog ${scrollable ? 'modal-dialog-scrollable' : ''} ${
          centered ? 'modal-dialog-centered' : ''
        } ${size ? `modal-${size}` : ''}`}
        role="document"
        onClick={stopPropagation}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{renderObjectOrFunction(body, { close: onClose })}</div>
          {footer && <div className="modal-footer">{renderObjectOrFunction(footer, { close: onClose })}</div>}
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  centered: true,
  keyboard: true,
  scrollable: false,
  size: '',
  staticBackdrop: false,
};

Modal.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  centered: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  isOpen: PropTypes.bool,
  keyboard: PropTypes.bool,
  onClose: PropTypes.func,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl', '']),
  staticBackdrop: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

function renderObjectOrFunction(content, params) {
  if (typeof content === 'function') {
    return content(params);
  }

  return content;
}
