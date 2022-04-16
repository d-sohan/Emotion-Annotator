import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Annotate from './Annotate';

const Frame = (props) => {
  const [hasAnnotated, setHasAnnotated] = useState(false);

  function handleAnnotate(data) {
    setHasAnnotated(true);
    props.onAnnotate(data);
  }
  return (
    <div className="mb-3">
      <Card className={hasAnnotated && 'card-annotated'}>
        <Row>
          <Col>
            <img className="frame-img" src={props.src} alt="extracted frame" />
          </Col>
          <Col>
            <div className="frame-content">
              <div className="frame-x">
                <Button variant="outline-danger" onClick={props.onDelete}>
                  &#x2715;
                </Button>
              </div>
              <div className="frame-annotate">
                <Annotate heading={false} addAnnotation={handleAnnotate} />
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Frame;
