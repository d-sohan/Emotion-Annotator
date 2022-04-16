import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Frame from './Frame';
import Preview from './Preview';

function fileNamer(width, val) {
  const p = Math.pow(10, width);
  if (val <= p - 1) {
    const s = `${p + val}`;
    return s.substring(1);
  } else {
    return `${val}`;
  }
}

const maxFrameLength = 10;

const FrameExtract = (props) => {
  const vidRef = createRef();
  const history = useHistory();
  const [frames, setFrames] = useState([]);
  const [frameKey, setFrameKey] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [frameAnnotations, setFrameAnnotations] = useState([]);

  useEffect(() => {
    setFrames([]);
    setFrameKey(0);
    setFrameAnnotations([]);
  }, [props.src]);

  useEffect(() => {
    if (frames.length >= maxFrameLength) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [frames.length]);

  function handleCapture() {
    const vid = vidRef.current;
    vid.pause();
    if (frames.length < maxFrameLength) {
      setFrameKey(frameKey + 1);
      const canvas = document.createElement('canvas');
      canvas.height = vid.videoHeight;
      canvas.width = vid.videoWidth;
      const context = canvas.getContext('2d');
      context.drawImage(vid, 0, 0, context.canvas.width, context.canvas.height);
      canvas.toBlob(function (blob) {
        const newFrame = [
          {
            id: frameKey,
            imgSrc: URL.createObjectURL(blob),
            fileBlob: blob,
            time: vid.currentTime,
            imgHeight: vid.videoHeight,
            imgWidth: vid.videoWidth,
          },
        ];
        setFrames(newFrame.concat(frames));
      });
    } else {
      setShowAlert(true);
    }
  }

  function handleDelete(id) {
    const url = frames.find((frame) => frame.id === id).imgSrc;
    setFrameAnnotations(frameAnnotations.filter((frameAnnotation) => frameAnnotation.id !== id));
    setFrames(frames.filter((frame) => frame.id !== id));
    URL.revokeObjectURL(url);
  }

  function handleAnnotation(id, data) {
    const newFrameAnnotations = frameAnnotations.filter((frameAnnotation) => frameAnnotation.id !== id);
    const newFrameAnnotation = [{ id: id, emotion: data }];
    setFrameAnnotations(newFrameAnnotations.concat(newFrameAnnotation));
  }

  function handleUpload() {
    const formData = new FormData();
    for (let i = 0; i < frameAnnotations.length; i++) {
      const fr = frameAnnotations[i];
      const reqFrame = frames.find((frame) => frame.id === fr.id);
      const fn = `${fileNamer(Math.floor(frameAnnotations.length / 10) + 1, i + 1)}`;
      formData.append('frames', reqFrame.fileBlob, `${fn}.png`);
      fr.frame = `${i + 1}`;
    }
    axios
      .post('/video/upload', formData)
      .then((res) => {
        props.setFinalProps({
          temp: res.data,
          name: props.name.substring(0, props.name.lastIndexOf('.')),
          type: 'video',
          annotation: frameAnnotations,
          loading: true,
          download: false,
          error: false,
        });
        history.push('/final');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <Preview inputType="video" ref={vidRef} src={props.src} title="uploaded Vid" />
      <Button className="mb-3" onClick={handleCapture}>
        Capture Frame
      </Button>
      <div>
        {showAlert && (
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Frames limit reached!</Alert.Heading>
            <p>For security purposes, you cannot capture more than {maxFrameLength} frames at a time.</p>
          </Alert>
        )}
      </div>
      <div>
        {frames.map((frame) => (
          <Frame
            key={frame.id}
            id={frame.id}
            src={frame.imgSrc}
            onDelete={() => handleDelete(frame.id)}
            onAnnotate={(data) => handleAnnotation(frame.id, data)}
          />
        ))}
      </div>

      <Button variant="warning" size="lg" onClick={handleUpload} disabled={frameAnnotations.length === 0}>
        Upload{` (${frameAnnotations.length})`}
      </Button>
    </div>
  );
};

export default FrameExtract;
