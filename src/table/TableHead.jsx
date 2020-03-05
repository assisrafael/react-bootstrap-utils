import React from 'react';
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
