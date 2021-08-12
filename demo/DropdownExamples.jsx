import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isEmptyLike, isFunction } from 'js-var-type';
// eslint-disable-next-line import/no-unresolved
import { Dropdown, Form, FormInput, FormDropdownSelect, FormAutocomplete } from '../dist/main';

import { formatClasses } from '../src/utils/attributes';
import { useOpenState } from '../src/utils/useOpenState';
import { useFormControl } from '../src/forms/helpers/useFormControl';
import { handleInputChange, normalizeOptions, booleanOrFunction } from '../src/forms/helpers/form-helpers';

const items = [
  // {
  //   value: '1',
  //   label: 'Item 1',
  // },
  // {
  //   value: '2',
  //   label: 'Item 2',
  //   isDisabled: true,
  // },
  // {
  //   value: '3',
  //   label: 'Item 3',
  // },
  {
    value: '123',
    label: (
      <div className="px-2 py-1">
        <div>Especificacao Tecnica 1</div>
        <div>Pin 1</div>
      </div>
    ),
  },
  {
    value: '456',
    label: (
      <div className="px-2 py-1">
        <div>Especificacao Tecnica 2</div>
        <div>Pin 2</div>
      </div>
    ),
  },
];

export function DropdownExamples() {
  const [isOpen, setIsOpen] = useState();
  const [itemProgramacao, setItemProgramacao] = useState(null);

  return (
    <div className="row">
      <div className="col-6 mb-3">
        <h1 className="h4">Simple dropdown</h1>
        <button type="button" onClick={() => setIsOpen(true)}>
          {itemProgramacao ? (
            <>
              <div>{itemProgramacao?.especificacaoTecnica}</div>
              <div>{itemProgramacao?.pin}</div>
            </>
          ) : (
            'Selecione um Item de Programação'
          )}
        </button>

        <Dropdown
          items={items}
          isOpen={isOpen}
          onSelect={(args) => {
            // eslint-disable-next-line no-console
            console.info('onSelect', args);
            setIsOpen(false);
            setItemProgramacao(args?.value);
          }}
        />
      </div>

      <FormTeste />
    </div>
  );+
}

const FormTeste = () => {
  return (
    <Form
      initialValues={{ dropdownSelect: '123' }}
      onSubmit={(formData, resetForm) => {
        console.log('onSubmit', formData);

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      }}
    >
      <FormDropdownSelect
        name="dropdownSelect"
        options={items}
        placeholder="Selecione..."
        childClassName="form-control"
        itemClassName="border-bottom"
      />
      <FormAutocomplete name="autocomplete" options={['1', '2', '3']} required />
    </Form>
  );
};
