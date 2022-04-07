import React, { createRef, useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Frame from './Frame';
import Preview from './Preview';

const FrameExtract = (props) => {
  const vidRef = createRef();
  const [frames, setFrames] = useState([]);
  const [frameKey, setFrameKey] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setFrames([]);
    setFrameKey(0);
  }, [props.src]);

  useEffect(() => {
    if (frames.length >= 5) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [frames.length]);

  function handleCapture() {
    const vid = vidRef.current;
    vid.pause();
    if (frames.length < 5) {
      setFrameKey(frameKey + 1);
      const canvas = document.createElement('canvas');
      canvas.height = vid.videoHeight;
      canvas.width = vid.videoWidth;
      const context = canvas.getContext('2d');
      context.drawImage(vid, 0, 0, context.canvas.width, context.canvas.height);
      const newFrame = [
        {
          id: frameKey,
          imgSrc: canvas.toDataURL(),
          time: vid.currentTime,
          imgHeight: vid.videoHeight,
          imgWidth: vid.videoWidth,
        },
      ];
      setFrames(newFrame.concat(frames));
    } else {
      setShowAlert(true);
    }
  }

  function handleDelete(id) {
    setFrames(frames.filter((frame) => frame.id !== id));
  }

  return (
    <div>
      <Preview inputType="video" ref={vidRef} src={props.src} title="uploaded Vid" />
      <Button className="mb-3" onClick={handleCapture}>
        Capture Frame
      </Button>
      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Frames limit reached!</Alert.Heading>
          <p>For security purposes, you cannot capture more than 5 frames at a time.</p>
        </Alert>
      )}

      {frames.map((frame) => (
        <Frame key={frame.id} id={frame.id} src={frame.imgSrc} onDelete={() => handleDelete(frame.id)} />
      ))}
    </div>
  );
};

export default FrameExtract;
