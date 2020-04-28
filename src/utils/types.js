export function isISOString(value) {
  if (!isString(value)) {
    return false;
  }

  if (value.length !== 24) {
    return false;
  }

  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);
}

export function isString(value) {
  return typeof value === 'string';
}

export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isNull(value) {
  return value === null;
}

export function isFunction(value) {
  return typeof value === 'function';
}
