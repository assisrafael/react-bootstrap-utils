import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Dropdown } from '../dist/main';

const items = [
  {
    value: '1',
    label: 'Item 1',
  },
  {
    value: '2',
    label: 'Item 2',
    isDisabled: true,
  },
  {
    value: '3',
    label: 'Item 3',
  },
];

export function DropdownExamples() {
  const [isOpen, setIsOpen] = useState();

  return (
    <div className="row">
      <div className="col-6 mb-3">
        <h1 className="h4">Simple dropdown</h1>
        <button type="button" onClick={() => setIsOpen(true)}>
          Simple dropdown
        </button>

        <Dropdown
          items={items}
          isOpen={isOpen}
          onSelect={(args) => {
            // eslint-disable-next-line no-console
            console.info('onSelect', args);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
}
