import React from 'react';
import PropTypes from 'prop-types';

import { getValueByPath } from '../utils';

export function TreeView({ childrenPath, draggable, nodes, template }) {
  return (
    <div className="rbu-treeview">
      <ul className="list-group">
        <TreeNodes
          depth={0}
          nodes={nodes}
          template={template}
          childrenPath={childrenPath}
          draggable={draggable}
          relativePath={`${childrenPath}`}
        />
      </ul>
    </div>
  );
}
TreeView.propTypes = {
  childrenPath: PropTypes.string.isRequired,
  draggable: PropTypes.bool,
  nodes: PropTypes.array.isRequired,
  template: PropTypes.func.isRequired,
};

function TreeNodes({ childrenPath, depth, draggable, nodes, parentNode, template, relativePath }) {
  return (
    <>
      {nodes.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          parentNode={parentNode}
          index={index}
          template={template}
          childrenPath={childrenPath}
          depth={depth}
          draggable={draggable}
          relativePath={`${relativePath}[${index}]`}
        />
      ))}
    </>
  );
}

TreeNodes.propTypes = {
  childrenPath: PropTypes.string,
  depth: PropTypes.number,
  draggable: PropTypes.bool,
  nodes: PropTypes.array,
  parentNode: PropTypes.object,
  template: PropTypes.func,
  relativePath: PropTypes.string,
};

function TreeNode({ node, parentNode, index, template, childrenPath, depth, draggable, relativePath }) {
  const childrenNodes = getValueByPath(node, childrenPath);

  return (
    <div draggable={draggable}>
      <li className="list-group-item" style={{ marginLeft: `${depth * 20}px`, borderTopWidth: '1px' }}>
        {template(node, index, parentNode, relativePath)}
      </li>

      {childrenNodes && (
        <TreeNodes
          nodes={childrenNodes}
          parentNode={node}
          template={template}
          childrenPath={childrenPath}
          depth={depth + 1}
          relativePath={`${relativePath}.${childrenPath}`}
        />
      )}
    </div>
  );
}
TreeNode.propTypes = {
  node: PropTypes.object,
  parentNode: PropTypes.object,
  index: PropTypes.number,
  template: PropTypes.func,
  childrenPath: PropTypes.string,
  depth: PropTypes.number,
  draggable: PropTypes.bool,
  relativePath: PropTypes.string,
};
