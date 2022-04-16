import React, { useState } from 'react';

import { FormControl } from 'react-bootstrap';
import FrameExtract from '../components/FrameExtract';

const VideoScreen = (props) => {
  const [file, setFile] = useState({
    src: '',
    name: '',
    selected: false,
  });

  function handleSelected(event) {
    if (file.src !== '') {
      URL.revokeObjectURL(file.src);
    }
    if (event.target.files.length > 0) {
      setFile({
        src: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
        selected: true,
      });
    } else {
      setFile({
        src: '',
        name: '',
        selected: false,
      });
    }
  }

  return (
    <div>
      <h2>Extract and Upload Video Frames</h2>
      <div>
        <FormControl className="mb-3" type="file" accept="video/mp4" onChange={handleSelected} />
        {file.selected && <FrameExtract src={file.src} name={file.name} setFinalProps={props.setFinalProps} />}
      </div>
    </div>
  );
};

export default VideoScreen;
