import React from 'react';
import PropTypes from 'prop-types';

import { getColumnClass } from './table-helpers';

export function TableHead({ columns, hasActions, actionLabel, columnHeaderFormat }) {
  const filteredColumns = columns.filter((column) => !column.hideIf?.());

  return (
    <thead>
      <tr>
        {filteredColumns?.map((column, columnIndex) => (
          <th key={columnIndex} className={getColumnClass(column)} width={column.width}>
            {columnHeaderFormat(column.label, column.attribute, column)}
          </th>
        ))}
        {hasActions && <th className="text-center">{actionLabel}</th>}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  actionLabel: PropTypes.string,
  hasActions: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  columnHeaderFormat: PropTypes.func.isRequired,
};
