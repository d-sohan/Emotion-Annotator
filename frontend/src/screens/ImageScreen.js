import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Annotate from '../components/Annotate';
import Preview from '../components/Preview';
import axios from 'axios';

const ImageScreen = (props) => {
  const history = useHistory();

  const imgRef = useRef(null);
  const [file, setFile] = useState({
    fileObj: {},
    selected: false,
    annotated: false,
  });

  // useEffect(() => {
  //   if (file.selected) {
  //     console.log(file.fileObj);
  //   }
  // }, [file]);

  function handleChange(event) {
    if (event.target.files.length > 0) {
      setFile({
        fileObj: event.target.files[0],
        selected: true,
        annotated: false,
      });
    } else {
      setFile({
        fileObj: {},
        selected: false,
        annotated: false,
      });
    }
  }

  function handleAnnotation(data) {
    setFile({
      fileObj: file.fileObj,
      annotation: data,
      selected: file.selected,
      annotated: true,
    });
  }

  function handleUpload() {
    if (file.annotated) {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      canvas.toBlob(function (blob) {
        const formData = new FormData();
        formData.append('img', blob, file.fileObj.name);
        axios
          .post('/image/upload', formData)
          .then((res) => {
            props.setFinalProps({
              temp: res.data,
              name: file.fileObj.name.substring(0, file.fileObj.name.lastIndexOf('.')),
              type: 'image',
              annotation: file.annotation,
              loading: true,
              download: false,
              error: false,
            });
            history.push('/final');
          })
          .catch((err) => {
            console.error(err);
          });
      }, file.fileObj.type);
    } else {
      console.log('Nothing to upload');
    }
  }

  return (
    <div>
      <h2>Upload Image</h2>
      <Form.Control className="mb-3" type="file" accept="image/png, image/jpeg" onChange={handleChange} />
      {file.selected && (
        <Preview
          className="my-3"
          ref={imgRef}
          inputType="image"
          src={URL.createObjectURL(file.fileObj)}
          title="uploaded Img"
        />
      )}
      {file.selected && <Annotate addAnnotation={handleAnnotation} heading={true} />}
      <Button variant="warning" size="lg" onClick={handleUpload} disabled={!file.annotated}>
        Upload
      </Button>
    </div>
  );
};

export default ImageScreen;
