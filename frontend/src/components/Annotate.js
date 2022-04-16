import React, { useRef, useState } from 'react';
import { Button, Card, FormControl, FormLabel, FormSelect } from 'react-bootstrap';

const emotionList = ['happiness', 'sadness', 'disgust', 'fear', 'surprise', 'anger', 'contempt', 'custom'];

const Annotate = (props) => {
  const textRef = useRef(null);
  const selectRef = useRef(null);
  const [showCustom, setShowCustom] = useState(false);

  function handleChange() {
    if (selectRef.current.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
    }
  }

  function handleSubmit() {
    const annotationData = showCustom ? textRef.current.value : selectRef.current.value;
    props.addAnnotation(annotationData);
  }
  return (
    <div>
      {props.heading && <h2 className="mb-3">Annotation:</h2>}
      <Card className="annotator mb-3">
        <FormLabel htmlFor="emotion">Emotion Annotation</FormLabel>
        <FormSelect className="mb-2" ref={selectRef} id="emotion" onChange={handleChange}>
          {emotionList.map((emotion, index) => (
            <option key={index} value={emotion}>
              {emotion}
            </option>
          ))}
        </FormSelect>
        {showCustom && (
          <FormControl
            className="mb-2"
            ref={textRef}
            required
            type="text"
            id="emotion"
            placeholder="e.g. anticipation"
          />
        )}
        <Button onClick={handleSubmit}>Annotate</Button>
      </Card>
    </div>
  );
};

export default Annotate;
