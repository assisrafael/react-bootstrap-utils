import React from 'react';
import ReactDOM from 'react-dom';

import { StatefulTabs, Pagination } from '../src/';
import { FormExamples } from './FormExamples';
import { TableExamples } from './TableExamples';
import { TabsExamples } from './TabsExamples';

ReactDOM.render(
  <div className="mt-3">
    <StatefulTabs
      vertical={true}
      initialTab={3}
      tabs={[
        {
          title: 'Forms',
          content: <FormExamples />,
        },
        {
          title: 'Tables',
          content: <TableExamples />,
        },
        { title: 'Tabs', content: <TabsExamples /> },
        { title: 'Pagination', content: <PaginationExamples /> },
      ]}
    />
  </div>,
  document.getElementById('root')
);

// eslint-disable-next-line no-undef
module.hot.accept();

function PaginationExamples() {
  return <Pagination lastPage={10} actualPage={4} onSelect={console.log} />;
}
