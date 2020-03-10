import React from 'react';
import PropTypes from 'prop-types';
import { getColumnClass } from './table-helpers';

export function TableHead({ columns, actions, actionLabel }) {
  return (
    <thead>
      <tr>
        {columns.map((column, columnIndex) => (
          <th key={columnIndex} className={getColumnClass(column)}>
            {column.label}
          </th>
        ))}
        {actions && <th className="text-center">{actionLabel}</th>}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  actionLabel: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
};
