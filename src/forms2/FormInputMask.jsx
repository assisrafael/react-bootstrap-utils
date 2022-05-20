import React, { useRef, useCallback, useMemo, useEffect, Fragment } from 'react';
import { isUndefined } from 'js-var-type';
import PropTypes from 'prop-types';

import { getValueByPath } from '../utils/getters-setters';

import { useFormControl2 } from './helpers/useFormControl';
import { FormInput2 } from './FormInput';
import { FormGroup2 } from './FormGroup';

export function FormInputMask2({ mask, name, inputAttrs }) {
  const formControl = useFormControl2(name);
  const ref = useRef(null);
  const valorInicial = useMemo(() => getValueByPath(formControl.getFormData(), name), [formControl, name]);

  const handleKeyDown = useCallback(
    (e) => {
      const value = formControl.getValue();

      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (Number(value) === 0 || String(value).length === 1) {
          e.target.value = '';
          formControl.setValue('');
        }
      }
    },
    [formControl]
  );

  useEffect(() => {
    //formatação do valor inicial do input, deve ser executada apenas uma vez
    const valorInicialFormatado = mask?.format?.(valorInicial) ?? valorInicial;

    if (isUndefined(valorInicialFormatado)) {
      return;
    }

    ref.current.value = valorInicialFormatado;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        ref={ref}
        className="form-control"
        name={`__mask.${name}`}
        defaultValue=""
        onChange={(e) => {
          const { maskedValue, rawValue } = mask?.parse?.(e.target.value) ?? {
            maskedValue: e.target.value,
            rawValue: e.target.value,
          };

          e.target.value = maskedValue;
          formControl.setValue(rawValue);
        }}
        onKeyDown={handleKeyDown}
        disabled={inputAttrs?.disabled}
        {...inputAttrs}
      />
      <FormInput2 name={name} style={{ display: 'none' }} />
    </>
  );
}

FormInputMask2.propTypes = {
  mask: PropTypes.shape({
    format: PropTypes.func.isRequired,
    parse: PropTypes.func.isRequired,
  }),
  name: PropTypes.string.isRequired,
  inputAttrs: PropTypes.object,
};

export function FormGroupInputMask2(props) {
  return (
    <FormGroup2 {...props}>
      <FormInputMask2 {...props} />
    </FormGroup2>
  );
}

FormGroupInputMask2.propTypes = {
  label: PropTypes.node.isRequired,
  mask: PropTypes.shape({
    format: PropTypes.func.isRequired,
    parse: PropTypes.func.isRequired,
  }),
  name: PropTypes.string.isRequired,
  inputAttrs: PropTypes.shape({
    afterChange: PropTypes.func,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    help: PropTypes.node,
    id: PropTypes.string,
    max: PropTypes.string,
    maxLength: PropTypes.string,
    min: PropTypes.string,
    minLength: PropTypes.string,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    step: PropTypes.string,
    type: PropTypes.string,
  }),
};
