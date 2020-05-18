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
    if (typeof cursor === 'undefined' || cursor === null) {
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
  // null, undefined values check
  if (!item) {
    return item;
  }

  if (Object.prototype.toString.call(item) === '[object Array]') {
    return item.map(deepClone);
  }

  if (typeof item != 'object') {
    return item;
  }

  // testing that this is DOM
  if (item.nodeType && typeof item.cloneNode == 'function') {
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
