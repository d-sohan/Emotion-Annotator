import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const Frame = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <img className="frame-img mb-3" src={props.src} alt="extracted frame" />
        </Col>
        <Col>
          <Button className="btn-danger" onClick={props.onDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Frame;
