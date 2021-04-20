import React from 'react';

import { Form, FormInput, TreeView } from '../dist/main';

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

  return (
    <div>
      <h1 className="h4">Simple Tree View</h1>

      <TreeView
        nodes={nodes}
        template={(item, index, parentItem) => (
          <em>
            {item.attrA} (index: {index} parent: {parentItem?.attrA || <em>None</em>})
          </em>
        )}
        childrenPath={'children'}
        draggable={true}
      />

      <div className="mt-4">
        <h1 className="h4">Tree View with Form</h1>
        <Form initialValues={{ nodes }} onSubmit={(newValues) => console.log(newValues)}>
          <TreeView
            nodes={nodes}
            template={(item, index, parentItem, path) => (
              <em>
                <p>Path: path</p>
                <FormInput name={`nodes${path}.attrA`} />
              </em>
            )}
            childrenPath={'children'}
            draggable={true}
          />
        </Form>
      </div>
    </div>
  );
}
