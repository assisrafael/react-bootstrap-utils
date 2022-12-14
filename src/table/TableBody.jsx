import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyLike, isFunction } from 'js-var-type';

import { safeClick } from '../utils/event-handlers';
import { getValueByPath } from '../utils/getters-setters';

import { getColumnClass } from './table-helpers';
import { TableActions } from './TableActions';

export function TableBody({ columns, docs, rowRole, rowClass, actions, onRowClick }) {
  const trRole = rowRole ?? isFunction(onRowClick) ? 'button' : 'row';
  const trOnClick = isFunction(onRowClick) ? onRowClick : () => {};
  const filteredColumns = columns.filter((column) => !column.hideIf?.());

  return (
    <tbody>
      {docs?.map((doc, docIndex) => (
        <tr
          key={docIndex}
          className={rowClass(doc)}
          role={trRole}
          onClick={safeClick(trOnClick, doc, docIndex)}
          data-testid={`tr-${docIndex}`}
        >
          {filteredColumns?.map((column, columnIndex) => (
            <td
              key={columnIndex}
              className={getColumnClass(column)}
              data-testid={isEmptyLike(column.dataTestId) ? '' : column.dataTestId}
              width={column.width}
            >
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
  rowRole: PropTypes.string,
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
