import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const DisplayResults = (props) => {
  const { sub1, sub2, sub3, configToast, isloggedIn } = props;

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
      </col>
    </Row>
  );
};

export default DisplayResults;
