/* eslint-disable no-console */
import React from 'react';
import {
  Form,
  FormGroupInput,
  FormGroupSelect,
  FormGroupSwitch,
  FormGroupCheckbox,
  FormGroupRadio,
  FormGroupTextarea,
  FormGroupAutocomplete,
} from '../dist/main';

export function FormExamples() {
  return (
    <Form
      initialValues={{ textField: 'abc', selectField2: { e: 2, c: 'b' } }}
      onChange={console.info}
      onSubmit={(formData, reset) => {
        console.log('onSubmit', formData);
        // return Promise.resolve();
        reset();
      }}
      transform={(formData) => {
        formData.__v = formData.__v ? formData.__v + 1 : 1;

        return formData;
      }}
      onCancel={() => console.log('onCancel')}
      customValidation={true}
      validations={{
        textField3: [
          {
            message: 'Must be filled if textField is not empty',
            validate(value, formData) {
              return !formData.textField || value;
            },
          },
        ],
        autocompleteField1: [
          {
            message: 'Must be filled if textField3 is empty',
            validate(value, formData) {
              return formData.textField3 || value;
            },
          },
        ],
        selectField: [
          {
            message: 'Must be filled if autocompleteField1 is empty',
            validate(value, formData) {
              return formData.autocompleteField1 || value;
            },
          },
        ],
        switchField: [
          {
            message: 'Must be filled if selectField is empty',
            validate(value, formData) {
              return formData.selectField || value;
            },
          },
        ],
        checkboxField: [
          {
            message: 'Must be filled if switchField is empty',
            validate(value, formData) {
              return formData.switchField || value;
            },
          },
        ],
        radioField: [
          {
            message: 'Must be filled if checkboxField is empty',
            validate(value, formData) {
              return formData.checkboxField || value;
            },
          },
        ],
        textareaField: [
          {
            message: 'Must be filled if radioField is empty',
            validate(value, formData) {
              return formData.radioField || value;
            },
          },
        ],
      }}
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
          <FormGroupAutocomplete
            name="autocompleteField1"
            label="Autocomplete"
            options={['1234', '2345', '3456']}
            placeholder="Type some numbers"
            required
          />
        </div>
        <div className="col">
          <FormGroupAutocomplete
            name="autocompleteField2"
            label="Autocomplete that opens on focus"
            options={['Abcde', 'Fghij', 'klmno']}
            placeholder="Type some letters"
            openOnFocus={true}
          />
        </div>
        <div className="col">
          <FormGroupAutocomplete
            name="autocompleteField3"
            label="Autocomplete with item template"
            options={[
              {
                value: 1,
                label: '1234',
              },
              {
                value: 2,
                label: '2345',
              },
              {
                value: 3,
                label: '3456',
              },
            ]}
            placeholder="Type some numbers"
            template={(option) => (
              <>
                <strong>{option}</strong> - {option}
              </>
            )}
          />
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
              { label: 'C', value: 'd' },
            ]}
            required
          />
        </div>
        <div className="col">
          <FormGroupSelect
            name="selectField3"
            label="Select field 3 (function)"
            options={(formData) =>
              Object.entries(formData)
                .filter(([key, value]) => key !== 'selectField3' && value)
                .map(([, value]) => value)
            }
            placeholder="Select one value"
          />
        </div>
        <div className="col">
          <FormGroupSelect
            name="selectField4"
            label="Select field 4 (objects with trackBy)"
            options={[
              { label: 'A', value: { c: 'a', e: 1 } },
              { label: 'B', value: { c: 'b', e: 2 } },
              { label: 'C', value: { c: 'd', e: 3 } },
            ]}
            trackBy="c"
            required
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

      {[0, 1].map((index) => (
        <div className="row" key={index}>
          <div className="col">
            <FormGroupInput name={`array[${index}].data.text`} label={`Array text ${index}`} />
          </div>
          <div className="col">
            <FormGroupSelect
              name={`array[${index}].data.select`}
              label={`Array select ${index}`}
              options={['Yes', 'No']}
            />
          </div>
        </div>
      ))}
    </Form>
  );
}
