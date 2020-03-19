import { formatClasses } from '../utils/attributes';

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
  return formatClasses([align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : '']);
}
