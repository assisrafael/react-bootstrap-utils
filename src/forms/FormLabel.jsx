import React from 'react';

export function FormLabel({ id, label }) {
  return <label htmlFor={id}>{label}</label>;
}
