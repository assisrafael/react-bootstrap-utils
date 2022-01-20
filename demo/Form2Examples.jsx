/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Form2,
  FormGroupInput2,
  FormGroupSelect2,
  FormGroupSwitch2,
  FormGroupTextarea2,
  FormInput2,
  useFormControl2,
  useFormEffect,
} from '../dist/main';

export function Form2Examples() {
  return (
    <div className="pb-4">
      Alternative Form implementation
      <Form2
        initialValues={{
          attrA: 'ABC',
          Obj: { x: 'X', z: 0 },
          arr: [1, 2, 3],
          arrObj: [{ o: 1 }, { o: 2 }, { o: 3 }],
          masks: {},
          textarea1:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque praesentium quisquam reiciendis expedita. Ad quod voluptas aliquid illum veniam odio? Nulla sed, illum eligendi amet fuga optio officia itaque nisi',
        }}
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
        customValidation={true}
        validations={{
          attrB: [
            {
              message: 'Must be filled if AttrA is not empty',
              validate(value, formData) {
                return !formData.attrA || value;
              },
            },
          ],
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
        <FormGroupInput2 label="AttrA" name="attrA"></FormGroupInput2>
        <FormGroupInput2 label="AttrB" name="attrB"></FormGroupInput2>
        <FormGroupSelect2 label="AttrC" name="attrC" options={[1, 2, 3]}></FormGroupSelect2>
        <FormGroupSwitch2 id="attrD" label="AttrD" name="attrD"></FormGroupSwitch2>

        <div className="form-group">
          <label htmlFor="">Version</label>
          <FormVersion />
        </div>

        <FormGroupTextarea2 label="Textarea" name="textarea1" rows="5" />

        <FormMasked />

        <div className="form-group">
          <label htmlFor="">Observer</label>
          <FormObserver />
        </div>
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

function FormMasked() {
  const percentageFormControl = useFormControl2('masks.percentageValue');

  const decimalMask = function (v) {
    let maskedValue = String(v);

    maskedValue = maskedValue.replace(/\D/g, '');
    maskedValue = maskedValue.replace(/(\d)(\d{3})$/, '$1.$2');

    return maskedValue;
  };

  const dateMask = function (v) {
    let maskedValue = v;

    maskedValue = maskedValue.replace(/\D/g, '');

    maskedValue = maskedValue.replace(/(\d{2})(\d)/, '$1/$2');
    maskedValue = maskedValue.replace(/(\d{2})(\d)/, '$1/$2');

    return maskedValue;
  };

  const hourMask = function (v) {
    let maskedValue = v;

    maskedValue = maskedValue.replace(/\D/g, '');
    maskedValue = maskedValue.replace(/(\d{2})(\d)/, '$1:$2');

    return maskedValue;
  };

  const currency = function (v) {
    let maskedValue = v;

    maskedValue = maskedValue.replace(/\D/g, '');
    maskedValue = maskedValue.replace(/(\d)(\d{2})$/, '$1,$2');
    maskedValue = maskedValue.replace(/(?=(\d{3})+(\D))\B/g, '.');

    return maskedValue;
  };

  const percentageMask = function (v) {
    let maskedValue = v;
    maskedValue = maskedValue.replace(/[^0-9\.]/g, '');

    if (!maskedValue) {
      return '';
    }

    return `${maskedValue}%`;
  };

  return (
    <div>
      <strong>Masked Inputs</strong>
      <FormGroupInput2 label="Masked Date" name="masks.date" maxLength="10" maskFunction={dateMask} />

      <FormGroupInput2 label="Masked Hour" name="masks.hour" maxLength="5" maskFunction={hourMask} />

      <FormGroupInput2 label="Masked 3 decimals Number" name="masks.decimal" maskFunction={decimalMask} />

      <div className="form-group">
        <label htmlFor="">Percentage Mask % </label>
        <FormInput2
          name="masks.percentage"
          maskFunction={percentageMask}
          afterChange={(value) => {
            const rawValue = value.replace(/\%/, '');
            percentageFormControl.setValue(Number(rawValue) / 100);
          }}
        />
        <FormInput2 type="number" name="masks.percentageValue" style={{ display: 'none' }} />
      </div>

      <FormGroupInput2 label="Currency" name="masks.currency" maskFunction={currency} />
    </div>
  );
}
