import { isISOString, isDate } from './types';

export function toDatetimeLocal(value) {
  let date = value;

  if (isISOString(date)) {
    date = new Date(date);
  }

  if (!isDate(date)) {
    throw new Error('toDatetimeLocal only accepts date objects and ISO date strings');
  }

  const YYYY = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
}

export function fromDatetimeLocal(value) {
  return new Date(Date.parse(value));
}
