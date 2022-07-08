import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ImageHandler from '../components/ImageHandler';

const ImageScreen = (props) => {
  const [file, setFile] = useState({
    fileObj: null,
    srcs: [],
    selected: false,
  });

  function handleChange(event) {
    for (let s of file.srcs) {
      if (s !== '') {
        URL.revokeObjectURL(s);
      }
    }
    if (event.target.files.length > 0) {
      const fileArray = [];
      const srcArray = [];
      for (let i = 0; i < event.target.files.length; i++) {
        fileArray[i] = event.target.files.item(i);
        srcArray[i] = URL.createObjectURL(fileArray[i]);
      }
      setFile({
        fileObj: fileArray,
        srcs: srcArray,
        selected: true,
      });
    } else {
      setFile({
        fileObj: null,
        srcs: [],
        selected: false,
      });
    }
  }

  // function handleUpload() {
  //   if (file.annotated) {
  //     const img = imgRef.current;
  //     const canvas = document.createElement('canvas');
  //     canvas.height = img.naturalHeight;
  //     canvas.width = img.naturalWidth;
  //     let ctx = canvas.getContext('2d');
  //     ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  //     canvas.toBlob(function (blob) {
  //       const formData = new FormData();
  //       formData.append('img', blob, file.fileObj.name);
  //       axios
  //         .post('/image/upload', formData)
  //         .then((res) => {
  //           props.setFinalProps({
  //             temp: res.data,
  //             name: file.fileObj.name.substring(0, file.fileObj.name.lastIndexOf('.')),
  //             type: 'image',
  //             annotation: file.annotation,
  //             loading: true,
  //             download: false,
  //             error: false,
  //           });
  //           history.push('/final');
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }, file.fileObj.type);
  //   } else {
  //     console.log('Nothing to upload');
  //   }
  // }

  return (
    <div>
      <h2>Upload Image</h2>
      <Form.Control className="mb-3" type="file" accept="image/png, image/jpeg" onChange={handleChange} multiple />
      {file.selected && <ImageHandler files={file.fileObj} srcs={file.srcs} setFinalProps={props.setFinalProps} />}
    </div>
  );
};

export default ImageScreen;
