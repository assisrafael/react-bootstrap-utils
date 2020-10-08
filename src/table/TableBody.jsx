import React from 'react';
import PropTypes from 'prop-types';
import { getColumnClass } from './table-helpers';
import { safeClick } from '../utils/event-handlers';
import { getValueByPath } from '../utils/getters-setters';
import { TableActions } from './TableActions';

export function TableBody({ columns, docs, rowClass, actions, onRowClick }) {
  return (
    <tbody>
      {docs.map((doc, docIndex) => (
        <tr key={docIndex} className={rowClass(doc)} role="button" onClick={safeClick(onRowClick, doc, docIndex)}>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex} className={getColumnClass(column)}>
              {getColumnValue(doc, column, docIndex)}
            </td>
          ))}

          <TableActions doc={doc} docIndex={docIndex} actions={actions} />
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  docs: PropTypes.arrayOf(PropTypes.object),
  rowClass: PropTypes.func,
  onRowClick: PropTypes.func,
};

function getColumnValue(doc, column, docIndex) {
  const rawValue = getValueByPath(doc, column.attribute);

  if (!column.format) {
    return rawValue;
  }

  return column.format(rawValue, doc, docIndex);
}
