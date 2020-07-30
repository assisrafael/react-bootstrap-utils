import React from 'react';
import { useToasts } from '../dist/main';

export function ToastsExamples() {
  const { showToast, closeAllToasts } = useToasts();

  return (
    <div className="row">
      <div className="col-6 mb-5">
        <h1 className="h4">Top left </h1>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            showToast('Top left toast!', {
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
          type="button"
          className="btn btn-success"
          onClick={() => {
            showToast('Top right toast!', { autoClose: false, type: 'success' });
          }}
        >
          Show top right toast
        </button>
      </div>
      <div className="col-6 mb-5">
        <h1 className="h4">Bottom left </h1>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            showToast('Bottom left toast!', {
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
          type="button"
          className="btn btn-warning"
          onClick={() => {
            showToast('Bottom right toast!', {
              position: 'BOTTOM_RIGHT',
              type: 'warning',
            });
          }}
        >
          Show bottom right toast
        </button>
      </div>
      <div className="col-12">
        <button type="button" className="btn btn-secondary" onClick={closeAllToasts}>
          Close all
        </button>
      </div>
    </div>
  );
}
