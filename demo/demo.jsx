import React from 'react';
import ReactDOM from 'react-dom';

import { Form, FormGroupInput, FormGroupSelect, FormGroupSwitch } from '../src/';

ReactDOM.render(
  <Form
    initialValues={{ textField: 'abc' }}
    onSubmit={(formData, reset) => {
      console.log('onSubmit', formData);
      return Promise.resolve();
      // reset();
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
    </div>

    <FormGroupSelect name="selectField" label="Select field (list)" options={['A', 'B', 'C']} />
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

    <FormGroupSwitch id="switchFieldId" name="switchField" label="Switch field" trueLabel="ON" falseLabel="OFF" />
  </Form>,
  document.getElementById('root')
);

module.hot.accept();
