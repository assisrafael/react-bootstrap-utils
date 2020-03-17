import React from 'react';
import ReactDOM from 'react-dom';

import { StatefulTabs, Pagination } from '../dist/main';
import { FormExamples } from './FormExamples';
import { TableExamples } from './TableExamples';
import { TabsExamples } from './TabsExamples';
import { DialogExamples } from './DialogExamples';
import { ListGroupExamples } from './ListGroupExamples';

ReactDOM.render(
  <div className="mt-3">
    <React.StrictMode>
      <StatefulTabs
        vertical={true}
        initialTab={2}
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
