import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const FinalScreen = ({ setFinalProps, finalProps }) => {
  const [errorFiles, setErrorFiles] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (finalProps.loading) {
      axios
        .post(`/${finalProps.type}/process`, {
          temp: finalProps.temp,
          name: finalProps.name,
          annotation: finalProps.annotation,
        })
        .then((res) => {
          if (res.data === 'done') {
            setFinalProps({
              temp: finalProps.temp,
              name: finalProps.name,
              type: finalProps.type,
              annotation: finalProps.annotation,
              loading: false,
              download: true,
              error: false,
            });
          } else if (res.data === 'failed') {
            setFinalProps({
              temp: finalProps.temp,
              name: finalProps.name,
              type: finalProps.type,
              annotation: finalProps.annotation,
              loading: false,
              download: false,
              error: true,
            });
          } else {
            setErrorFiles(res.data);
            setFinalProps({
              temp: finalProps.temp,
              name: finalProps.name,
              type: finalProps.type,
              annotation: finalProps.annotation,
              loading: false,
              download: true,
              error: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [finalProps, setFinalProps]);

  function goHome() {
    history.replace('/');
  }

  function handleDownload() {
    let downloadName = finalProps.name;
    if (finalProps.type === 'image') {
      if (finalProps.annotation.length > 1) {
        downloadName = 'result';
      } else {
        downloadName = finalProps.name[0].name;
      }
    }
    axios({
      url: `/${finalProps.type}/download`,
      method: 'POST',
      data: {
        temp: finalProps.temp,
        name: finalProps.name,
      },
      responseType: 'blob',
    })
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${downloadName}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        goHome();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRetry() {
    setFinalProps({
      temp: finalProps.temp,
      name: finalProps.name,
      type: finalProps.type,
      annotation: finalProps.annotation,
      loading: true,
      download: false,
      error: false,
    });
  }

  function cleanUp() {
    axios
      .post(`/${finalProps.type}/cleanup`, { temp: finalProps.temp })
      .then((res) => {
        goHome();
      })
      .catch((err) => {
        console.log(err);
        goHome();
      });
  }

  if (finalProps.loading) {
    return (
      <div className="final-placeholder">
        <Spinner animation="border" className="mx-3" />
        <h3 className="processing">Processing...</h3>
      </div>
    );
  } else if (finalProps.download && !finalProps.error) {
    return (
      <div className="final-placeholder">
        <h2 className="text-center">Your Download is ready.</h2>
        <div className="text-center">
          <Button variant="success" size="lg" onClick={handleDownload}>
            Download
          </Button>
        </div>
      </div>
    );
  } else if (finalProps.error && !finalProps.download) {
    return (
      <div className="final-placeholder">
        <h2 className="text-center">Failed to Process your input.</h2>
        <p className="text-center">
          This could be because we didn't find a face in your upload.
          <br />
          If it continue to fail after some tries, consider uploading a different image(s).
        </p>
        <div className="text-center">
          <Button variant="danger" className="me-3" size="lg" onClick={handleRetry}>
            Retry
          </Button>
          <Button variant="primary" size="lg" onClick={cleanUp}>
            Home
          </Button>
        </div>
      </div>
    );
  } else if (finalProps.download && finalProps.error) {
    return (
      <div className="final-placeholder">
        <h2 className="text-center">Your Download is ready.</h2>
        <h4 className="text-center">However, some files couldn't be processed.</h4>
        <p className="text-center">This could be because we didn't find a face in those files.</p>

        <div className="text-center mb-5">
          <Button variant="warning" className="me-3" size="lg" onClick={handleDownload}>
            Download
          </Button>
          <Button variant="primary" size="lg" onClick={cleanUp}>
            Home
          </Button>
        </div>
        <div>
          <div className="error-label mb-2">
            <span>The following files were not processed:</span>
            <span>
              <Badge bg="danger">{errorFiles.length}</Badge>
            </span>
          </div>
          <ListGroup className="error-lg">
            {errorFiles.map((fn) => (
              <ListGroupItem>{fn}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  } else {
    return (
      <div className="final-placeholder">
        <h2 className="text-center">Nothing to load.</h2>
        <div className="text-center">
          <Button variant="primary" size="lg" onClick={goHome}>
            Home
          </Button>
        </div>
      </div>
    );
  }
};

export default FinalScreen;
