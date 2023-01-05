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
  FormGroupAutocomplete2,
  FormGroupDropdown2,
} from '../dist/main';

export function Form2Examples() {
  const [bootstrapFormValidation, setBootstrapFormValidation] = useState(false);
  return (
    <div className="pb-4">
      <h4>Alternative Form implementation</h4>
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
        customValidation={bootstrapFormValidation}
        validations={{
          autocomplete2Field2: [
            {
              message: 'Must be filled if Autocomplete Object Options is empty',
              validate(value, formData) {
                return formData.autocomplete2Field1 || value;
              },
            },
          ],
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
        <h5>Form configuration:</h5>
        <FormGroupSwitch2
          id="bootstrapForms2Validation"
          name="bootstrapForm2Validation"
          label="Use bootstrap form validation?"
          afterChange={(value) => setBootstrapFormValidation(value)}
        />
        <hr />
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
        <FormGroupAutocomplete2
          name="autocomplete2Field1"
          label="Autocomplete Object Options"
          options={[
            { value: { _id: '1234', name: '1234 name' }, label: '1234 Label' },
            { value: { _id: '2345', name: '2345 name' }, label: '2345 Label' },
            { value: { _id: '3456', name: '3456 name' }, label: '3456 Label' },
          ]}
          placeholder="Type some numbers"
          trackBy="_id"
          help="Autocomplete help"
          allowUnlistedValue
        />

        <FormGroupAutocomplete2
          name="autocomplete2Field2"
          label="Autocomplete Field with Custom Validation"
          options={['1', '2', '3']}
          placeholder="Type some numbers"
          allowUnlistedValue
        />

        <FormGroupAutocomplete2
          name="autocomplete2Field3"
          label="Autocomplete with item template"
          options={Array.from({ length: 10 }).map((_, index) => ({
            value: index + 1,
            label: `${index + 1}${index + 2}${index + 3}${index + 4}`,
          }))}
          placeholder="Type some numbers"
          template={(option) => (
            <>
              <strong>{option}</strong> - {option}
            </>
          )}
          required={() => true}
        />

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

        <FormGroupTextarea2
          label="Textarea"
          name="textarea1"
          rows="5"
          afterChange={(newValue, oldValue) => {
            console.log(oldValue, ' changed to  :>> ', newValue);
          }}
        />

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
          inputAttrs={{
            afterChange(newValue, oldValue) {
              console.log(oldValue, ' changed to  :>> ', newValue);

              console.log('afterChange in decimalMask :>> ', newValue);
            },
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

        <FormGroupDropdown2
          label="FormDropdown2"
          name="dropdown"
          options={[
            {
              value: 1,
              label: 'Label para o valor 1',
            },
            {
              value: 2,
              label: 'Label para o valor 2',
            },
            {
              value: 3,
              label: 'Label para o valor 3',
            },
          ]}
          template={(linha) => <p className="mb-0">{linha}</p>}
        />
        <FormGroupDropdown2
          label="FormDropdown2 disabled"
          name="dropdown-desabilitado"
          options={[
            {
              value: 1,
              label: 'Label para o valor 1',
            },
            {
              value: 2,
              label: 'Label para o valor 2',
            },
            {
              value: 3,
              label: 'Label para o valor 3',
            },
          ]}
          template={(linha) => <p className="mb-0">{linha}</p>}
          disabled
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
