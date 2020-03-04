import React from 'react';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { normalizeColumns } from './table-helpers';

export function Table({ docs, columns, striped, bordered, hover, small, dark, rowClass, caption }) {
  const normalizedColumns = normalizeColumns(columns);

  const tableClasses = [
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
    small && 'table-sm',
    dark && 'table-dark',
  ].join(' ');
  return (
    <table className={tableClasses}>
      {caption && <caption>{caption}</caption>}
      <TableHead columns={normalizedColumns} />
      <TableBody docs={docs} columns={normalizedColumns} rowClass={rowClass} />
    </table>
  );
}

Table.defaultProps = {
  striped: true,
  bordered: false,
  hover: true,
  small: true,
  dark: false,
  rowClass: () => '',
};
