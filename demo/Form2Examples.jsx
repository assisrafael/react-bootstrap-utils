/* eslint-disable no-console */
import React from 'react';
import { Form2, FormInput2, FormSelect2, FormSwitch2 } from '../dist/main';

export function Form2Examples() {
  return (
    <div>
      Alternative Form implementation
      <Form2
        initialValues={{ attrA: 'ABC' }}
        onSubmit={console.info.bind(console, 'onSubmit')}
        onChange={console.info.bind(console, 'onChange')}
        transform={(formData) => ({
          __v: formData.__v ? formData.__v + 1 : 1,
          attrB: `${formData.attrB || ''}A`,
        })}
      >
        <div className="form-group">
          <label htmlFor="">AttrA</label>
          <FormInput2 name="attrA" />
        </div>
        <div className="form-group">
          <label htmlFor="">AttrB</label>
          <FormInput2 name="attrB" />
        </div>
        <div className="form-group">
          <label htmlFor="">AttrC</label>
          <FormSelect2 name="attrC" options={[1, 2, 3]} />
        </div>
        <div className="form-group">
          <label htmlFor="">AttrD</label>
          <FormSwitch2 name="attrD" id="attrD" />
        </div>
        <button className="btn btn-success">Submit</button>
      </Form2>
    </div>
  );
}
