import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Frame from './Frame';
import ImgPreview from './ImgPreview';
import Annotate from './Annotate';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ImageHandler = ({ files, srcs, setFinalProps }) => {
  const history = useHistory();
  const [imgFiles, setImgFiles] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    setImgFiles(
      files.map((file, index) => {
        return { id: index, fileObj: file, src: srcs[index] };
      })
    );
    setAnnotations([]);
    setToDelete([]);
  }, [files, srcs]);

  function handleAnnotation(id, data) {
    const newAnnotations = annotations.filter((annotation) => annotation.id !== id);
    const newAnnotation = { id: id, emotion: data };
    setAnnotations(newAnnotations.concat(newAnnotation));
  }

  function handleDelete(id) {
    const url = imgFiles.find((imgFile) => imgFile.id === id).src;
    setToDelete(toDelete.concat(id));
    setAnnotations(annotations.filter((annotation) => annotation.id !== id));
    URL.revokeObjectURL(url);
  }

  function handleUpload() {
    const formData = new FormData();
    const nameArray = [];
    for (let annotation of annotations) {
      const imgFile = imgFiles.find((element) => element.id === annotation.id);
      const nameElement = {
        id: annotation.id,
        name: imgFile.fileObj.name.substring(0, imgFile.fileObj.name.lastIndexOf('.')),
        ext: imgFile.fileObj.name.substring(imgFile.fileObj.name.lastIndexOf('.') + 1),
      };
      nameArray.push(nameElement);
      formData.append('images', imgFile.fileObj, `${nameElement.name}-${nameElement.id}.${nameElement.ext}`);
    }
    axios
      .post('/image/upload', formData)
      .then((res) => {
        setFinalProps({
          temp: res.data,
          name: nameArray,
          type: 'image',
          annotation: annotations,
          loading: true,
          download: false,
          error: false,
        });
        history.push('/final');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (imgFiles.length === 1) {
    return (
      <div>
        <ImgPreview src={imgFiles[0].src} title="Uploaded Image Single" />
        <Annotate addAnnotation={(data) => handleAnnotation(imgFiles[0].id, data)} heading={true} />
        <Button variant="warning" size="lg" onClick={handleUpload} disabled={annotations.length !== 1}>
          Upload
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          {imgFiles
            .filter((element) => !toDelete.includes(element.id))
            .map((imgFile) => (
              <Frame
                key={imgFile.id}
                id={imgFile.id}
                src={imgFile.src}
                onDelete={() => handleDelete(imgFile.id)}
                onAnnotate={(data) => handleAnnotation(imgFile.id, data)}
              />
            ))}
        </div>
        <Button variant="warning" size="lg" onClick={handleUpload} disabled={annotations.length < 1}>
          Upload{` (${annotations.length})`}
        </Button>
      </div>
    );
  }
};

export default ImageHandler;
