import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = ({ setFinalProps }) => {
  useEffect(() => {
    setFinalProps({
      temp: '',
      name: '',
      type: '',
      annotation: null,
      loading: false,
      download: false,
      error: false,
    });
  }, []);
  return (
    <div>
      <h2 className="my-3">Choose Input File type</h2>
      <LinkContainer to="/image">
        <Button className="me-3" variant="outline-primary" size="lg">
          Image
        </Button>
      </LinkContainer>
      <LinkContainer to="/video">
        <Button variant="outline-primary" size="lg">
          Video
        </Button>
      </LinkContainer>
      <div className="my-4">
        <h2>About Emotion Annotator</h2>
        <p>This tool helps users to extract facial landmarks from images, and annotate them with an emotion.</p>
        <p>Output is a .csv file that contains the facial features and annotated emotion.</p>
      </div>
    </div>
  );
};

export default HomeScreen;
