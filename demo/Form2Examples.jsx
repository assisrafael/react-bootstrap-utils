/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Form2,
  FormGroupCheckbox2,
  FormGroupInput2,
  FormGroupInputMask2,
  FormGroupSelect2,
  FormGroupSwitch2,
  FormGroupTextarea2,
  FormInput2,
  useFormControl2,
  useFormEffect,
  NumberMask,
} from '../dist/main';

export function Form2Examples() {
  return (
    <div className="pb-4">
      Alternative Form implementation
      <Form2
        initialValues={{
          attrA: 'ABC',
          Obj: { x: 'X', z: 0 },
          arr: [1, 2, 3, 4, 5],
          arrObj: [{ o: 1 }, { o: 2 }, { o: 3 }],
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

        <FormGroupCheckbox2
          id="checkboxFieldId"
          name="checkboxField"
          label="Checkbox field"
          valueLabel="Checkbox description"
          help="Checkbox help"
        />

        <FormGroupCheckbox2 id="checkboxFieldId2" name="checkboxField2" label="Checkbox field 2" disabled />

        <div className="form-group">
          <label htmlFor="">Version</label>
          <FormVersion />
        </div>

        <FormGroupTextarea2 label="Textarea" name="textarea1" rows="5" />

        <div className="form-group">
          <label htmlFor="">Observer</label>
          <FormObserver />
        </div>

        <FormGroupInputMask2
          name="decimalMask"
          label="Masked 3 decimal with"
          mask={{
            parse: decimalMask,
            format: (value) => value,
          }}
        />

        <FormGroupInputMask2
          name="dateMask"
          inputAttrs={{
            maxLength: '10',
          }}
          label="Masked date"
          mask={{
            parse: dateMask,
            format: (value) => value,
          }}
        />

        <FormGroupInputMask2
          name="hourMask"
          inputAttrs={{
            maxLength: '5',
          }}
          label="Hour mask"
          mask={{
            parse: hourMask,
            format: (value) => value,
          }}
        />

        <FormGroupInputMask2
          name="currencyMask"
          label="Currency mask"
          mask={{
            parse: currencyMask,
            format: (value) => value,
          }}
        />
      </Form2>
    </div>
  );
}

function FormVersion() {
  const { getValue } = useFormControl2('__v');

  return <div>{getValue() || ''}</div>;
}

function FormArray() {
  const { getValue, setValue, isRegistered } = useFormControl2('arr', 'array');
  const [refresh, shouldRefresh] = useState(false);

  useEffect(() => {
    if (isRegistered()) {
      console.log('initialized value [arr] :>> ', getValue());
    } else {
      console.log('uninitialized value [arr] :>> ', getValue());
    }
  }, [getValue, setValue, isRegistered]);

  const remove = useCallback((index) => {
    const newArray = [...getValue()];

    newArray.splice(index, 1);

    setValue(newArray);

    shouldRefresh(true);

    setTimeout(() => {
      shouldRefresh(false);
    }, 100);
  });

  const newElement = useCallback(() => {
    setValue((prevValue) => [...prevValue, Math.max(...prevValue) + 1]);
  });

  if (refresh) {
    return <></>;
  }

  return (
    <>
      {(getValue() || []).map((v, index) => (
        <div className="input-group mb-2">
          <FormInput2 key={index} name={`arr[${index}]`} />
          <div className="input-group-append">
            <button className="btn btn-danger" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div>
        <button className="btn btn-success" onClick={newElement}>
          New
        </button>
      </div>
    </>
  );
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

function decimalMask(value) {
  const number = parseFloat(value);
  let maskedValue = String(value);

  maskedValue = maskedValue.replace(/\D/g, '');
  maskedValue = maskedValue.replace(/(\d)(\d{3})$/, '$1.$2');

  return {
    rawValue: number,
    maskedValue,
  };
}

function dateMask(value) {
  let maskedValue = String(value);

  maskedValue = maskedValue.replace(/\D/g, '');

  maskedValue = maskedValue.replace(/(\d{2})(\d)/, '$1/$2');
  maskedValue = maskedValue.replace(/(\d{2})(\d)/, '$1/$2');

  return {
    rawValue: maskedValue,
    maskedValue,
  };
}

function hourMask(v) {
  let maskedValue = v;

  maskedValue = maskedValue.replace(/\D/g, '');
  maskedValue = maskedValue.replace(/(\d{2})(\d)/, '$1:$2');

  return { rawValue: maskedValue, maskedValue };
}

function currencyMask(v) {
  const rawValue = parseFloat(v);
  let maskedValue = v;

  maskedValue = maskedValue.replace(/\D/g, '');
  maskedValue = maskedValue.replace(/(\d)(\d{2})$/, '$1.$2');
  maskedValue = maskedValue.replace(/(?=(\d{3})+(\D))\B/g, ',');

  return { maskedValue, rawValue };
}
