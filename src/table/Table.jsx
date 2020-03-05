import React from 'react';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { normalizeColumns } from './table-helpers';

export function Table({
  docs,
  columns,
  striped,
  bordered,
  hover,
  small,
  dark,
  rowClass,
  caption,
  actions,
  actionLabel,
}) {
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
    <div className="table-responsive">
      <table className={tableClasses}>
        {caption && <caption>{caption}</caption>}
        <TableHead {...{ actions, actionLabel }} columns={normalizedColumns} />
        <TableBody {...{ docs, rowClass, actions }} columns={normalizedColumns} />
      </table>
    </div>
  );
}

Table.defaultProps = {
  striped: true,
  bordered: false,
  hover: true,
  small: true,
  dark: false,
  actionLabel: 'Actions',
  rowClass: () => '',
};
