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
    if (typeof cursor === 'undefined') {
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
