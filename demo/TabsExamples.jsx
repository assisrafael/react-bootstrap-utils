import React from 'react';
import { StatefulTabs, Tabs } from '../dist/main';

export function TabsExamples() {
  return (
    <div className="tabs-examples">
      <div className="row">
        <div className="col">
          <h1 className="h4">Simple Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: 'a' },
              { title: 'B', content: 'b' },
              { title: 'C', content: 'c' },
            ]}
          />
        </div>
        <div className="col">
          <h1 className="h4">Bordered Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: 'a' },
              { title: 'B', content: 'b' },
              { title: 'C', content: 'c' },
            ]}
            bordered={true}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <h1 className="h4">Vertical Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: 'a' },
              { title: 'B', content: 'b' },
              { title: 'C', content: 'c' },
            ]}
            vertical={true}
            onSelect={console.log}
          />
        </div>
        <div className="col">
          <h1 className="h4">Stateful Tabs</h1>
          <StatefulTabs
            tabs={[
              { title: 'A', content: 'a' },
              { title: 'B', content: 'b' },
              { title: 'C', content: 'c' },
            ]}
            vertical={true}
          />
        </div>
      </div>
    </div>
  );
}
