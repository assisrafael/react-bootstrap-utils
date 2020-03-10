import React from 'react';
import PropTypes from 'prop-types';
import { getColumnClass } from './table-helpers';

export function TableBody({ columns, docs, rowClass, actions }) {
  return (
    <tbody>
      {docs.map((doc, docIndex) => (
        <tr key={docIndex} className={rowClass(doc)}>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex} className={getColumnClass(column)}>
              {getColumnValue(doc, column, docIndex)}
            </td>
          ))}

          {actions && (
            <td className="text-center">
              {actions.map((action, actionIndex) => (
                <a
                  key={actionIndex}
                  title={action.title}
                  {...getActionProps(action, doc)}
                  className={actionIndex > 0 ? 'ml-2' : ''}
                >
                  {action.content}
                </a>
              ))}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  docs: PropTypes.arrayOf(PropTypes.object),
  rowClass: PropTypes.func,
};

function getColumnValue(doc, column, docIndex) {
  let rawValue = doc[column.attribute];

  if (!column.format) {
    return rawValue;
  }

  return column.format(rawValue, doc, docIndex);
}

function getActionProps(action, doc) {
  const props = {};

  if (action.onClick) {
    props.href = '';
    props.onClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      action.onClick(doc);
    };
  } else if (action.link) {
    props.href = action.link(doc);
  }

  return props;
}
