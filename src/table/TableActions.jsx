import React from 'react';
import PropTypes from 'prop-types';

import { safeClick, stopPropagation } from '../utils/event-handlers';
import { isFunction } from '../utils/types';

export function TableActions({ doc, docIndex, actions }) {
  if (!actions) {
    return null;
  }

  const normalizedActions = normalizeAction(actions, doc, docIndex);

  return (
    <td className="text-center">
      {normalizedActions.map((action, actionIndex) => (
        <span key={actionIndex} className={actionIndex > 0 ? 'ml-2' : ''}>
          <TableAction doc={doc} docIndex={docIndex} action={action} />
        </span>
      ))}
    </td>
  );
}

TableActions.propTypes = {
  doc: PropTypes.object.isRequired,
  docIndex: PropTypes.number.isRequired,
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
};

function TableAction({ doc, docIndex, action }) {
  if (isFunction(action)) {
    return action(doc, docIndex) || null;
  }

  if (action.onClick || action.link) {
    return (
      <a title={action.title} {...getActionProps(action, doc, docIndex)}>
        {action.content}
      </a>
    );
  }

  return action.content;
}

TableAction.propTypes = {
  doc: PropTypes.object.isRequired,
  docIndex: PropTypes.number.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

function getActionProps(action, doc, docIndex) {
  const props = {};

  if (action.onClick) {
    props.href = '';
    props.onClick = safeClick(action.onClick, doc, docIndex);
  } else if (action.link) {
    props.onClick = stopPropagation;
    props.href = action.link(doc, docIndex);
  }

  return props;
}

function normalizeAction(actions, doc, docIndex) {
  if (isFunction(actions)) {
    return actions(doc, docIndex);
  }

  return actions;
}
