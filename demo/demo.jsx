/* eslint-disable import/max-dependencies */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/no-unresolved
import { StatefulTabs, Pagination, ToastsContainer } from '../dist/main';

import { FormExamples } from './FormExamples';
import { TableExamples } from './TableExamples';
import { TabsExamples } from './TabsExamples';
import { DialogExamples } from './DialogExamples';
import { ListGroupExamples } from './ListGroupExamples';
import { ToastsExamples } from './ToastsExamples';
import { DropdownExamples } from './DropdownExamples';
import { TreeViewExamples } from './TreeViewExamples';
import { Form2Examples } from './Form2Examples';

ReactDOM.render(
  <div className="mt-3">
    <React.StrictMode>
      <StatefulTabs
        vertical={true}
        onlyRenderActiveTab={true}
        initialTab={0}
        tabs={[
          {
            title: 'Dialog',
            content: <DialogExamples />,
          },
          {
            title: 'Dropdown',
            content: <DropdownExamples />,
          },
          {
            title: 'Forms',
            content: <FormExamples />,
          },
          {
            title: 'Forms2',
            content: <Form2Examples />,
          },
          {
            title: 'List groups',
            content: <ListGroupExamples />,
          },
          {
            title: 'Pagination',
            content: <PaginationExamples />,
          },
          {
            title: 'Tables',
            content: <TableExamples />,
          },
          {
            title: 'Tabs',
            content: <TabsExamples />,
          },
          {
            title: 'Toasts',
            content: (
              <ToastsContainer>
                <ToastsExamples />,
              </ToastsContainer>
            ),
          },
          {
            title: 'TreeView',
            content: <TreeViewExamples />,
          },
        ]}
      />
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);

// eslint-disable-next-line no-undef
module.hot.accept();

function PaginationExamples() {
  return <Pagination lastPage={10} actualPage={4} onSelect={console.log} />;
}
