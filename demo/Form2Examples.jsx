/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form2, FormInput2, FormSelect2, FormSwitch2, useFormControl2, useFormEffect } from '../dist/main';

export function Form2Examples() {
  return (
    <div>
      Alternative Form implementation
      <Form2
        initialValues={{ attrA: 'ABC', Obj: { x: 'X', z: 0 }, arr: [1, 2, 3], arrObj: [{ o: 1 }, { o: 2 }, { o: 3 }] }}
        onSubmit={(data) => console.log('onSubmit', data)}
        onChange={(data) => console.log('onChange', data)}
        transform={(formData) => {
          console.log('transform', formData);

          return {
            __v: formData.__v ? formData.__v + 1 : 1,
            attrB: `${formData.attrB || ''}A`,
            Obj: {
              y: `${formData.Obj.y || ''}X`,
              w: {
                z: formData.__v ? formData.__v * 2 : 1,
              },
              t: formData.__v % 2 ? null : undefined,
              u: new Date(),
            },
            arr: formData.arr.map((v) => parseFloat(v) + 1),
            arrObj: formData.arrObj.map((v) => {
              v.o = parseFloat(v.o) ** 2;

              return v;
            }),
          };
        }}
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
            <div className="col">
              <FormInput2 name="Obj.z" type="number" step="0.1" />
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

        <div className="form-group">
          <label htmlFor="">Observer</label>
          <FormObserver />
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
  const { getValue, setValue, isRegistered } = useFormControl2('arr');

  useEffect(() => {
    if (isRegistered()) {
      console.log('initialized value [arr] :>> ', getValue());
    } else {
      console.log('uninitialized value [arr] :>> ', getValue());
    }
  }, [getValue, setValue, isRegistered]);

  return (getValue() || []).map((v, index) => <FormInput2 key={index} name={`arr[${index}]`} />);
}

function FormArrayOfObjects() {
  const { getValue } = useFormControl2('arrObj');

  return (getValue() || []).map((v, index) => <FormInput2 key={index} name={`arrObj[${index}].o`} />);
}

function FormObserver() {
  const [state, setState] = useState(0);

  useFormEffect('Obj', (data) => {
    console.log('FormObserver :>> ', data);
    setState((p) => p + 1);
  });

  return <div>{state}</div>;
}
