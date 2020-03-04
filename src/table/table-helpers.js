export function normalizeColumns(columns) {
  return columns.map((column) => {
    if (typeof column !== 'string') {
      return column;
    }

    return {
      attribute: column,
      label: column,
    };
  });
}
