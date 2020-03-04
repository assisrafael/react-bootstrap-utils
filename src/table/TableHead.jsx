import React from 'react';
import { getColumnClass } from './table-helpers';

export function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column, columnIndex) => (
          <th key={columnIndex} className={getColumnClass(column)}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
