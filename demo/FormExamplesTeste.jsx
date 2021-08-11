/* eslint-disable no-console */
import React from 'react';
import { Form, FormGroupDropdownSelect } from '../dist/main';

const items2 = [
  {
    value: {
      tipoEquipamento: 'EQUIP01',
      especificacaoTecnica: 'ESPEC01',
      pin: 'PIN01',
    },
    label: (
      <div style={{ border: '1px solid' }}>
        <p>
          Tipo de Equipamento: EQUIP01 orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        </p>
        <p>Especificação Técnica: ESPEC01</p>
        <p> Ponto de Investigação: PIN01</p>
      </div>
    ),
  },
  {
    value: {
      tipoEquipamento: 'EQUIP02',
      especificacaoTecnica: 'ESPEC02',
      pin: 'PIN02',
    },
    label: (
      <div style={{ border: '1px solid' }}>
        <p>
          Tipo de Equipamento: EQUIP02 orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        </p>
        <p>Especificação Técnica: ESPEC02</p>
        <p> Ponto de Investigação: PIN02</p>
      </div>
    ),
  },
  {
    value: {
      tipoEquipamento: 'EQUIP03',
      especificacaoTecnica: 'ESPEC03',
      pin: 'PIN03',
    },
    label: (
      <div style={{ border: '1px solid' }}>
        <p>
          Tipo de Equipamento: EQUIP013orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        </p>
        <p>Especificação Técnica: ESPEC03</p>
        <p> Ponto de Investigação: PIN03</p>
      </div>
    ),
  },
];

export function FormExamplesTeste() {
  return (
    <>
      <Form initialValues={{}} onSubmit={(data) => console.log('@@@ => Data = ', data)}>
        <FormGroupDropdownSelect
          name="itens2"
          label="Itens 02"
          placeholder="Selecione um item"
          options={items2.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          openOnFocus={true}
          template={(linha) => <span style={{ whiteSpace: 'normal' }}>{linha}</span>}
        />
      </Form>
    </>
  );
}
