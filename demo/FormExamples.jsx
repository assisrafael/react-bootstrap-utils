import React from 'react';
import {
  Form,
  FormGroupInput,
  FormGroupSelect,
  FormGroupSwitch,
  FormGroupCheckbox,
  FormGroupRadio,
  FormGroupTextarea,
} from '../dist/main';

export function FormExamples() {
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
                .map(([, value]) => value);
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
