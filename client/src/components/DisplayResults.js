import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const DisplayResults = (props) => {
  const { results } = props;
  const { sub1, sub2, sub3 } = results;

  return (
    <Row>
      <col>
        <Container>
          <Col className="">
            <h1>Semester Results</h1>
          </Col>
        </Container>
        <Form.Group className="mb-3" controlId="formBasicRollNumber">
          <Form.Label>Subject 1</Form.Label>
          <Form.Control
            // className={css.inputs}
            value={sub1}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRollNumber">
          <Form.Label>Subject 2</Form.Label>
          <Form.Control
            // className={css.inputs}
            value={sub2}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRollNumber">
          <Form.Label>Subject 3</Form.Label>
          <Form.Control
            // className={css.inputs}
            value={sub3}
          />
        </Form.Group>
      </col>
    </Row>
  );
};

export default DisplayResults;
