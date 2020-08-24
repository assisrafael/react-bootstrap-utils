import React from 'react';
import PropTypes from 'prop-types';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { normalizeColumns } from './table-helpers';
import { formatClasses } from '../utils/attributes';

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
  onRowClick,
  actions,
  actionLabel,
  columnHeaderFormat,
}) {
  const normalizedColumns = normalizeColumns(columns);

  const tableClasses = formatClasses([
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
    small && 'table-sm',
    dark && 'table-dark',
  ]);

  return (
    <div className="table-responsive">
      <table className={tableClasses}>
        {caption && <caption>{caption}</caption>}
        <TableHead {...{ actionLabel, columnHeaderFormat, hasActions: Boolean(actions) }} columns={normalizedColumns} />
        <TableBody {...{ docs, rowClass, actions, onRowClick }} columns={normalizedColumns} />
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
  onRowClick: () => {},
  columnHeaderFormat: (label) => label,
};

Table.propTypes = {
  actionLabel: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  bordered: PropTypes.bool,
  caption: PropTypes.node,
  columnHeaderFormat: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  dark: PropTypes.bool,
  docs: PropTypes.arrayOf(PropTypes.object),
  hover: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowClass: PropTypes.func,
  small: PropTypes.bool,
  striped: PropTypes.bool,
};
