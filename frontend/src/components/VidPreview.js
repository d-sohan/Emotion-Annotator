import React, { forwardRef } from 'react';

const VidPreview = (props, ref) => {
  return (
    <div className="mb-3">
      <h3>Preview Video:</h3>
      <div className="text-center">
        <video controls className="preview" ref={ref} src={props.src} type="video/mp4" />
      </div>
    </div>
  );
};

export default forwardRef(VidPreview);
