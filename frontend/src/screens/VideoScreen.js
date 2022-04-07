import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import FrameExtract from '../components/FrameExtract';

const VideoScreen = () => {
  const [file, setFile] = useState({
    fileObj: {},
    selected: false,
    extracted: false,
  });
  const [frames, setFrames] = useState([]);

  function handleSelected(event) {
    if (event.target.files.length > 0) {
      setFile({
        fileObj: event.target.files[0],
        selected: true,
        extracted: false,
      });
    } else {
      setFile({
        fileObj: {},
        selected: false,
        extracted: false,
      });
    }
  }

  function addFrames(frame) {
    if (frames.length < 10) {
      setFrames(frames.concat(frame));
    }
  }

  function uploadFrames() {
    if (file.extracted) {
      console.log(frames);
    } else {
      console.log('Nothing to upload');
    }
  }

  return (
    <div>
      <h2>Extract and Upload Video Frames</h2>
      <Form>
        <Form.Control className="mb-3" type="file" accept="video/mp4" onChange={handleSelected} />
        {file.selected && (
          <FrameExtract src={URL.createObjectURL(file.fileObj)} numFrames={frames.length} onAddFrame={addFrames} />
        )}
        <Button className="mb-3" onClick={uploadFrames} disabled={!file.extracted}>
          Upload
        </Button>
      </Form>
    </div>
  );
};

export default VideoScreen;
