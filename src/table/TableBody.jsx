import React from 'react';

export function TableBody({ columns, docs, rowClass }) {
  return (
    <tbody>
      {docs.map((doc, docIndex) => (
        <tr key={docIndex} className={rowClass(doc)}>
          {columns.map(({ attribute }, columnIndex) => (
            <td key={columnIndex}>{doc[attribute]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
