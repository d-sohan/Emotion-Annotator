import React, { forwardRef } from 'react';

const Preview = (props, ref) => {
  if (props.inputType === 'image') {
    return (
      <div className="mb-3">
        <h3>Preview Image:</h3>
        <img className="preview" ref={ref} src={props.src} alt={props.title} />
      </div>
    );
  } else {
    return (
      <div className="mb-3">
        <h3>Preview Video:</h3>
        <video controls className="preview" ref={ref} src={props.src} type="video/mp4" />
      </div>
    );
  }
};

export default forwardRef(Preview);
