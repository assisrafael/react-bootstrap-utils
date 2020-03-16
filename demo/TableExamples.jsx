import React from 'react';
import { Table } from '../dist/main';

export function TableExamples() {
  return (
    <div>
      <div className="row">
        <div className="col">
          <h1 className="h4">Simple Table</h1>
          <Table
            columns={['a', 'b', 'c']}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
          />
        </div>

        <div className="col">
          <h1 className="h4">Table with formated colums</h1>
          <Table
            columns={[
              { attribute: 'a', label: 'A', align: 'center' },
              { attribute: 'b', label: 'B', align: 'right' },
              { attribute: 'c', label: 'C' },
            ]}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
          />
        </div>

        <div className="col">
          <h1 className="h4">Table with formatted values </h1>
          <Table
            columns={[
              {
                attribute: 'selected',
                label: '#',
                format() {
                  return <input type="checkbox" />;
                },
              },
              {
                attribute: 'a',
                label: 'A',
                format(v) {
                  return v + '*';
                },
              },
              {
                attribute: 'b',
                label: 'B',
                format(v, doc) {
                  return v + doc.a;
                },
              },
              {
                attribute: 'c',
                label: 'C',
                format(_, __, docIndex) {
                  return <strong>{docIndex + 1}</strong>;
                },
              },
            ]}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h1 className="h4">Table with custom styles</h1>
          <Table
            columns={['a', 'b', 'c']}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
            dark={true}
            small={false}
            hover={false}
            striped={false}
            bordered={true}
            rowClass={(doc) => (doc.b % 2 === 1 ? 'table-primary' : '')}
          />
        </div>

        <div className="col">
          <h1 className="h4">Table with row actions</h1>
          <Table
            columns={[
              { attribute: 'a', label: 'A', align: 'center' },
              { attribute: 'b', label: 'B', align: 'right' },
              { attribute: 'c', label: 'C' },
            ]}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
            actions={[
              {
                title: 'View details',
                content: <span>V</span>,
                link(doc) {
                  return `#/${doc.a}`;
                },
              },
              {
                title: 'Remove item',
                content: '-',
                onClick(doc) {
                  console.log('removing', doc);
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
