import {
  isUndefined,
  isNull,
  isObject,
  isArray,
  isFunction,
  isString,
  isNumber,
  isBoolean,
  isPlainObject,
} from 'js-var-type';

export function splitPath(path) {
  return path
    .replace(/]/g, '')
    .split(/[.[]/)
    .map((path, index, paths) => {
      const def = { path };

      if (parseInt(paths[index + 1], 10).toString() === paths[index + 1]) {
        def.couldBeAnArray = true;
      }

      return def;
    });
}

export function getValueByPath(obj, objPath) {
  const paths = splitPath(objPath);

  return paths.reduce((cursor, { path }) => {
    if (isUndefined(cursor) || isNull(cursor)) {
      return;
    }

    if (!path) {
      return cursor;
    }

    return cursor[path];
  }, obj);
}

export function setValueByPath(obj, objPath, value) {
  const paths = splitPath(objPath);

  if (paths.length === 1) {
    obj[objPath] = value;

    return obj;
  }

  const { path: lastPath } = paths[paths.length - 1];
  const remainingPaths = paths.slice(0, paths.length - 1);

  const lastCursor = remainingPaths.reduce((cursor, { path, couldBeAnArray }) => {
    if (!path) {
      return cursor || (couldBeAnArray ? [] : {});
    }

    if (!cursor[path]) {
      cursor[path] = couldBeAnArray ? [] : {};
    }

    return cursor[path];
  }, obj);

  lastCursor[lastPath] = value;

  return obj || lastCursor;
}

export function deepClone(item) {
  // null, undefined values check and literals
  if (!item || !isObject(item)) {
    return item;
  }

  if (isArray(item)) {
    return item.map(deepClone);
  }

  // testing that this is DOM
  if (item.nodeType && isFunction(item.cloneNode)) {
    return item.cloneNode(true);
  }

  if (!item.prototype) {
    // check that this is a literal
    if (item instanceof Date) {
      return new Date(item);
    }

    // it is an object literal
    const result = {};

    for (const i in item) {
      result[i] = deepClone(item[i]);
    }

    return result;
  }

  return item;
}

export function flattenObject(data, prefix = '') {
  if (isArray(data)) {
    return data.reduce((result, v, index) => ({ ...result, ...flattenObject(v, `${prefix}[${index}]`) }), {});
  }

  if (isPrimitive(data) || !isPlainObject(data)) {
    if (prefix.length === 0) {
      throw new Error('cannot flatten type without a prefix');
    }

    return {
      [prefix]: data,
    };
  }

  return Object.entries(data).reduce((result, [key, value]) => {
    const prefixedKey = `${prefix ? `${prefix}.` : ''}${key}`;

    if (isPrimitive(value)) {
      result[prefixedKey] = value;

      return result;
    }

    const flattenedValue = flattenObject(value, prefixedKey);

    return {
      ...result,
      ...flattenedValue,
    };
  }, {});
}

function isPrimitive(v) {
  return isString(v) || isNumber(v) || isBoolean(v) || isNull(v) || isUndefined(v);
}
