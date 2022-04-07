import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Annotate from '../components/Annotate';
import Preview from '../components/Preview';

const ImageScreen = () => {
  const [file, setFile] = useState({
    fileObj: {},
    selected: false,
    annotated: false,
    uploaded: false,
  });

  function handleChange(event) {
    if (event.target.files.length > 0) {
      setFile({
        fileObj: event.target.files[0],
        selected: true,
        annotated: false,
        uploaded: false,
      });
    } else {
      setFile({
        fileObj: {},
        selected: false,
        annotated: false,
        uploaded: false,
      });
    }
  }

  function handleAnnotation(data) {
    setFile({
      fileObj: file.fileObj,
      annotation: data,
      selected: file.selected,
      annotated: true,
      uploaded: false,
    });
  }

  function handleUpload() {
    if (file.annotated) {
      console.log(file);
    } else {
      console.log('Nothing to upload');
    }
  }
  return (
    <div>
      <h2>Upload Image</h2>
      <Form>
        <Form.Control className="mb-3" type="file" accept="image/png, image/jpeg" onChange={handleChange} />
        {file.selected && (
          <Preview className="my-3" inputType="image" src={URL.createObjectURL(file.fileObj)} title="uploaded Img" />
        )}
        {file.selected && <Annotate addAnnotation={handleAnnotation} />}
        <Button onClick={handleUpload} disabled={!file.annotated}>
          Upload
        </Button>
      </Form>
    </div>
  );
};

export default ImageScreen;
