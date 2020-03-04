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

export function getColumnClass({ align }) {
  const classes = [align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''];

  return classes.join(' ');
}
