import React from 'react';

export function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map(({ label }, columnIndex) => (
          <th key={columnIndex}>{label}</th>
        ))}
      </tr>
    </thead>
  );
}
