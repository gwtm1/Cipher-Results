import React from "react";
import { Form, Button } from "react-bootstrap";
import css from "../css/Upload.module.css";

const Upload = () => {
  return (
    <div className={css.container}>
      <Form className={css.widget} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Batch Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="20XXBCS or 20XXIMT or 20XXIMG"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Semester Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Semester Number" />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Results CSV file</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Upload;
