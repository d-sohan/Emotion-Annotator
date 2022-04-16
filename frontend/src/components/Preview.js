import React, { forwardRef } from 'react';

const Preview = (props, ref) => {
  if (props.inputType === 'image') {
    return (
      <div className="mb-3">
        <h3>Preview Image:</h3>
        <div className="text-center">
          <img className="preview text-center" ref={ref} src={props.src} alt={props.title} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-3">
        <h3>Preview Video:</h3>
        <div className="text-center">
          <video controls className="preview" ref={ref} src={props.src} type="video/mp4" />
        </div>
      </div>
    );
  }
};

export default forwardRef(Preview);
