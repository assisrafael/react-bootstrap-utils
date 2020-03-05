import React from 'react';
import ReactDOM from 'react-dom';

import {
  Form,
  FormGroupInput,
  FormGroupSelect,
  FormGroupSwitch,
  FormGroupCheckbox,
  FormGroupRadio,
  FormGroupTextarea,
  Table,
} from '../src/';

ReactDOM.render(
  <div>
    <h1 className="mt-3">Forms</h1>
    <FormExamples />
    <hr className="my-5" />
    <h1 className="mt-3">Tables</h1>
    <TableExamples />
  </div>,
  document.getElementById('root')
);

module.hot.accept();

function FormExamples() {
  return (
    <Form
      initialValues={{ textField: 'abc' }}
      onSubmit={(formData, reset) => {
        console.log('onSubmit', formData);
        // return Promise.resolve();
        reset();
      }}
      onCancel={() => console.log('onCancel')}
    >
      <div className="row">
        <div className="col">
          <FormGroupInput name="textField" label="Text field" />
        </div>
        <div className="col">
          <FormGroupInput name="textField2" label="Text field 2" required placeholder="Fill some value" />
        </div>
        <div className="col">
          <FormGroupInput name="textField3" label="Text field 3" type="number" />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <FormGroupSelect name="selectField" label="Select field (list)" options={['A', 'B', 'C']} />
        </div>
        <div className="col">
          <FormGroupSelect
            name="selectField2"
            label="Select field 2 (array of objects)"
            options={[
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
              { label: 'C', value: 'c' },
            ]}
            required
          />
        </div>
        <div className="col">
          <FormGroupSelect
            name="selectField3"
            label="Select field 3 (function)"
            options={(formData) => {
              return Object.entries(formData)
                .filter(([key]) => key !== 'selectField3')
                .map(([_, value]) => value);
            }}
            placeholder="Select one value"
          />
        </div>
        <div className="col">
          <FormGroupSelect
            name="selectField4"
            label="Select field 4 (function)"
            options={(formData) => {
              return Object.entries(formData)
                .filter(([key]) => key !== 'selectField4')
                .map(([key, value]) => ({
                  label: key,
                  value,
                }));
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <FormGroupSwitch id="switchFieldId" name="switchField" label="Switch field" trueLabel="ON" falseLabel="OFF" />
        </div>
        <div className="col">
          <FormGroupCheckbox
            id="checkboxFieldId"
            name="checkboxField"
            label="Checkbox field"
            valueLabel="Checkbox description"
          />
        </div>
        <div className="col">
          <FormGroupRadio
            id="radioFieldId"
            name="radioField"
            label="Radio field"
            options={[
              {
                value: 'a',
                label: 'A',
              },
              {
                value: 'b',
                label: 'B',
              },
              {
                value: 'c',
                label: 'C',
              },
            ]}
          />
        </div>
      </div>

      <FormGroupTextarea name="textareaField" label="Textarea field" />
    </Form>
  );
}

function TableExamples() {
  return (
    <div>
      <h2>Simple Table</h2>
      <Table
        columns={['a', 'b', 'c']}
        docs={[
          { a: 1, b: 2, c: 3 },
          { a: 4, b: 5, c: 6 },
          { a: 7, b: 8, c: 9 },
        ]}
      />

      <h2>Table with formated colums</h2>
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

      <h2>Table with custom styles</h2>
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
  );
}
