import React from 'react';
import { getColumnClass } from './table-helpers';

export function TableBody({ columns, docs, rowClass }) {
  return (
    <tbody>
      {docs.map((doc, docIndex) => (
        <tr key={docIndex} className={rowClass(doc)}>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex} className={getColumnClass(column)}>
              {getColumnValue(doc, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function getColumnValue(doc, column) {
  let rawValue = doc[column.attribute];

  if (!column.format) {
    return rawValue;
  }

  return column.format(rawValue, doc);
}
