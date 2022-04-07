import React, { useRef } from 'react';
import { Button, Card, FormControl, FormLabel } from 'react-bootstrap';

const Annotate = (props) => {
  const ref = useRef(null);

  function handleSubmit() {
    const annotationData = ref.current.value;
    props.addAnnotation(annotationData);
  }
  return (
    <Card>
      <FormLabel htmlFor="emotion">Emotion Annotation</FormLabel>
      <FormControl ref={ref} required type="text" id="emotion" placeholder="e.g. joy" />
      <Button onClick={handleSubmit}>Annotate</Button>
    </Card>
  );
};

export default Annotate;
