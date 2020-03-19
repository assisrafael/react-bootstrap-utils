import React, { useContext } from 'react';
import { ToastsContext } from '../dist/main';

export function ToastsExamples() {
  const toastsState = useContext(ToastsContext);

  return (
    <div className="row">
      <div className="col-6 mb-5">
        <h1 className="h4">Top left </h1>
        <button
          className="btn btn-info"
          onClick={() => {
            toastsState.show('Top left toast!', {
              position: 'TOP_LEFT',
            });
          }}
        >
          Show top left toast
        </button>
      </div>
      <div className="col-6 mb-5">
        <h1 className="h4">Top right (default)</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            toastsState.show('Top right toast!', { autoClose: false, type: 'success' });
          }}
        >
          Show top right toast
        </button>
      </div>
      <div className="col-6 mb-5">
        <h1 className="h4">Bottom left </h1>
        <button
          className="btn btn-danger"
          onClick={() => {
            toastsState.show('Bottom left toast!', {
              position: 'BOTTOM_LEFT',
              type: 'danger',
            });
          }}
        >
          Show bottom left toast
        </button>
      </div>
      <div className="col-6 mb-5">
        <h1 className="h4">Bottom right </h1>
        <button
          className="btn btn-warning"
          onClick={() => {
            toastsState.show('Bottom right toast!', {
              position: 'BOTTOM_RIGHT',
              type: 'warning',
            });
          }}
        >
          Show bottom right toast
        </button>
      </div>
    </div>
  );
}
