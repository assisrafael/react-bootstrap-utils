import React from 'react';

export function TableBody({ columns, docs }) {
  return (
    <tbody>
      {docs.map((doc, docIndex) => (
        <tr key={docIndex}>
          {columns.map(({ attribute }, columnIndex) => (
            <td key={columnIndex}>{doc[attribute]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
