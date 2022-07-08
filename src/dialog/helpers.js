import { isFunction } from 'js-var-type';

export function hideModal(modalRef) {
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

export function hideModalBackdrop() {
  const backdrop = getModalBackdrop();

  if (backdrop.style.zIndex) {
    backdrop.style.zIndex -= 20;
  }

  if (countModals() === 0) {
    backdrop.classList.add('d-none');
    backdrop.style.zIndex = null;
  }
}

export function getModalBackdrop() {
  const body = document.querySelector('body');
  let backdrop = document.querySelector('.modal-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');

    backdrop.classList.add('modal-backdrop', 'fade', 'show', 'd-none');

    body.appendChild(backdrop);
  }

  return backdrop;
}

export function countModals() {
  return document.querySelectorAll('#modal-portals .modal.show').length;
}

export function enableBodyScroll() {
  const body = document.querySelector('body');

  body.classList.remove('modal-open');
}

export function showModal(modalRef) {
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

export function renderObjectOrFunction(content, params) {
  return isFunction(content) ? content(params) : content;
}

export function showModalBackdrop() {
  const backdrop = getModalBackdrop();

  backdrop.classList.remove('d-none');

  if (countModals() > 0) {
    backdrop.style.zIndex = getZIndex(backdrop) + 20;
  }
}

export function disableBodyScroll() {
  if (countModals() != 0) {
    return;
  }

  const body = document.querySelector('body');

  body.classList.add('modal-open');
}

export function getZIndex(elem) {
  return parseInt(window.getComputedStyle(elem).zIndex, 10);
}
