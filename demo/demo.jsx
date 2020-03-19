import React from 'react';
import ReactDOM from 'react-dom';

import { StatefulTabs, Pagination, ToastsContainer } from '../dist/main';
import { FormExamples } from './FormExamples';
import { TableExamples } from './TableExamples';
import { TabsExamples } from './TabsExamples';
import { DialogExamples } from './DialogExamples';
import { ListGroupExamples } from './ListGroupExamples';
import { ToastsExamples } from './ToastsExamples';

ReactDOM.render(
  <div className="mt-3">
    <React.StrictMode>
      <ToastsContainer>
        <StatefulTabs
          vertical={true}
          initialTab={4}
          tabs={[
            {
              title: 'Dialog',
              content: <DialogExamples />,
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
              content: <ToastsExamples />,
            },
          ]}
        />
      </ToastsContainer>
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);

// eslint-disable-next-line no-undef
module.hot.accept();

function PaginationExamples() {
  return <Pagination lastPage={10} actualPage={4} onSelect={console.log} />;
}
