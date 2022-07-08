import React from 'react';

const ImgPreview = (props) => {
  return (
    <div className="mb-3">
      <h3>Preview Image:</h3>
      <div className="text-center">
        <img className="preview text-center" src={props.src} alt={props.title} />
      </div>
    </div>
  );
};

export default ImgPreview;
