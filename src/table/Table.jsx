import React from 'react';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { normalizeColumns } from './table-helpers';

export function Table({ docs, columns }) {
  const normalizedColumns = normalizeColumns(columns);

  return (
    <table className="table">
      <TableHead columns={normalizedColumns} />
      <TableBody docs={docs} columns={normalizedColumns} />
    </table>
  );
}
