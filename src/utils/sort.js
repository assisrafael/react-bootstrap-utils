import { getValueByPath } from './getters-setters';

function compareASC(a, b) {
  if (!a || !b) {
    if (a) {
      return 1;
    }

    if (b) {
      return -1;
    }

    return 0;
  }

  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
}

function compareDESC(a, b) {
  if (!a || !b) {
    if (a) {
      return -1;
    }

    if (b) {
      return 1;
    }

    return 0;
  }

  if (a > b) {
    return -1;
  }

  if (a < b) {
    return 1;
  }

  return 0;
}

export function sortData(docs, { sortBy, sortOrder }) {
  return docs?.sort((a, b) =>
    sortOrder === 'ASC'
      ? compareASC(getValueByPath(a, sortBy), getValueByPath(b, sortBy))
      : compareDESC(getValueByPath(a, sortBy), getValueByPath(b, sortBy))
  );
}
