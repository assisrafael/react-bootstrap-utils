import React from 'react';
import ReactDOM from 'react-dom';

import { StatefulTabs } from '../src/';
import { FormExamples } from './FormExamples';
import { TableExamples } from './TableExamples';
import { TabsExamples } from './TabsExamples';

ReactDOM.render(
  <div className="mt-3">
    <StatefulTabs
      vertical={true}
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
      ]}
    />
  </div>,
  document.getElementById('root')
);

module.hot.accept();
