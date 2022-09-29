/* eslint-disable no-console */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { StatefulTabs, Tabs } from '../dist/main';

export function TabsExamples() {
  return (
    <div className="tabs-examples">
      <div className="row">
        <div className="col">
          <h1 className="h4">Simple Tabs</h1>
          <Tabs
            tabs={[
              {
                title: 'A',
                content: <Lorem header="Content A" />,
              },
              { title: 'B', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" /> },
            ]}
          />
        </div>
        <div className="col">
          <h1 className="h4">Bordered Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: <Lorem header="Content A" /> },
              { title: 'B', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" /> },
            ]}
            bordered={true}
            activeTab={4}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h1 className="h4">Justified Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: <Lorem header="Content A" /> },
              { title: 'Bbbbbbbbbbbbbbbb', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" /> },
            ]}
            justified={true}
            activeTab={1}
          />
        </div>
        <div className="col">
          <h1 className="h4">Fill Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: <Lorem header="Content A" /> },
              { title: 'Bbbbbbbbbbbbbbbb', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" /> },
            ]}
            fill={true}
            activeTab={1}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h1 className="h4">Vertical Tabs</h1>
          <Tabs
            tabs={[
              { title: 'A', content: <Lorem header="Content A" /> },
              { title: 'B', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" /> },
            ]}
            vertical={true}
            onSelect={(index) => console.log('Index selecionado ', index)}
          />
        </div>
        <div className="col">
          <h1 className="h4">Stateful Tabs</h1>
          <StatefulTabs
            tabs={[
              { title: 'A', content: <Lorem header="Content A" /> },
              { title: 'B', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" /> },
            ]}
            vertical={true}
            bordered={true}
            onSelect={(index) => console.log('Index selecionado ', index)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h1 className="h4">Hide Tabs</h1>
          <StatefulTabs
            tabs={[
              { title: 'A', content: <Lorem header="Content A" /> },
              { title: 'B', content: <Lorem header="Content B" /> },
              { title: 'C', content: <Lorem header="Content C" />, hideIf: () => true },
              { title: 'D', content: <Lorem header="Content D" />, hideIf: () => 10 > 2 },
              { title: 'E', content: <Lorem header="Content E" />, hideIf: () => 10 < 2 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Lorem({ header }) {
  return (
    <>
      <h3>{header}</h3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic iusto dolores voluptatum sunt. Assumenda, vero esse?
      Numquam alias repellendus, quaerat beatae expedita inventore recusandae, molestiae earum vel illo provident
      ducimus?
    </>
  );
}
