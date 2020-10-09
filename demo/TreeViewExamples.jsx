import React from 'react';

import { TreeView } from '../dist/main';

export function TreeViewExamples() {
  const nodes = [
    {
      attrA: '1. Attr A Value',
      children: [
        {
          attrA: '1.1. Attr A Value',
          children: [
            {
              attrA: '1.1.1. Attr A Value',
              children: [
                {
                  attrA: '1.1.1.1. Attr A Value',
                  children: [
                    {
                      attrA: '1.1.1.1.1. Attr A Value',
                      children: [
                        {
                          attrA: '1.1.1.1.1.1. Attr A Value',
                          children: [
                            {
                              attrA: '1.1.1.1.1.1.1. Attr A Value',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      attrA: '2. Attr A Value',
      children: [
        {
          attrA: '2.1. Attr A Value',
        },
        {
          attrA: '2.2. Attr A Value',
        },
      ],
    },
  ];

  return <TreeView nodes={nodes} template={(item, index) => <em>{item.attrA}</em>} childrenPath={'children'} draggable={true} />;
}
