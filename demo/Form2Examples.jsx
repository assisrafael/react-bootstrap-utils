/* eslint-disable no-console */
import React from 'react';
import { Form2, FormInput2, FormSelect2, FormSwitch2, useFormControl2 } from '../dist/main';

export function Form2Examples() {
  return (
    <div>
      Alternative Form implementation
      <Form2
        initialValues={{ attrA: 'ABC', Obj: { x: 'X' }, arr: [1, 2, 3], arrObj: [{ o: 1 }, { o: 2 }, { o: 3 }] }}
        onSubmit={console.info.bind(console, 'onSubmit')}
        onChange={console.info.bind(console, 'onChange')}
        transform={(formData) => ({
          __v: formData.__v ? formData.__v + 1 : 1,
          attrB: `${formData.attrB || ''}A`,
          Obj: {
            y: `${formData.Obj.y || ''}X`,
            w: {
              z: formData.__v ? formData.__v * 2 : 1,
            },
          },
          arr: formData.arr.map((v) => parseFloat(v) + 1),
          arrObj: formData.arrObj.map((v) => {
            v.o = parseFloat(v.o) ** 2;

            return v;
          }),
        })}
      >
        <div className="form-group">
          <label htmlFor="">Obj</label>
          <div className="form-row">
            <div className="col">
              <FormInput2 name="Obj.x" />
            </div>
            <div className="col">
              <FormInput2 name="Obj.y" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Array</label>
          <FormArray />
        </div>
        <div className="form-group">
          <label htmlFor="">Array of objects</label>
          <FormArrayOfObjects />
        </div>
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
        <div className="form-group">
          <label htmlFor="">Version</label>
          <FormVersion />
        </div>
        <button className="btn btn-success">Submit</button>
      </Form2>
    </div>
  );
}

function FormVersion() {
  const { getValue } = useFormControl2('__v');

  return <div>{getValue() || ''}</div>;
}

function FormArray() {
  const { getValue } = useFormControl2('arr');

  return (getValue() || []).map((v, index) => <FormInput2 key={index} name={`arr[${index}]`} />);
}

function FormArrayOfObjects() {
  const { getValue } = useFormControl2('arrObj');

  return (getValue() || []).map((v, index) => <FormInput2 key={index} name={`arrObj[${index}].o`} />);
}
