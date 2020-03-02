import React from 'react';
import { FormLabel } from './FormLabel';

export function FormGroup({ children, ...props }) {
  return (
    <div className="form-group">
      <FormLabel {...props} />
      {children}
    </div>
  );
}
