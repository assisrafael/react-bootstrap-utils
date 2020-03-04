import React from 'react';
import { getColumnClass } from './table-helpers';

export function TableBody({ columns, docs, rowClass }) {
  return (
    <tbody>
      {docs.map((doc, docIndex) => (
        <tr key={docIndex} className={rowClass(doc)}>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex} className={getColumnClass(column)}>
              {doc[column.attribute]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
