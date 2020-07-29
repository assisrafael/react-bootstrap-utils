/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';

import { StatefulTabs, Pagination, ToastsContainer } from '../dist/main';
import { FormExamples } from './FormExamples';
import { TableExamples } from './TableExamples';
import { TabsExamples } from './TabsExamples';
import { DialogExamples } from './DialogExamples';
import { ListGroupExamples } from './ListGroupExamples';
import { ToastsExamples } from './ToastsExamples';
import { DropdownExamples } from './DropdownExamples';

ReactDOM.render(
  <div className="mt-3">
    <React.StrictMode>
      <StatefulTabs
        vertical={true}
        onlyRenderActiveTab={true}
        initialTab={7}
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
