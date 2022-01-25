import React,{ useState } from "react";
import { Form, Button } from "react-bootstrap";
import css from "../css/ViewResults.module.css";

const ViewResults = () => {

  const [semester,setSemester] = useState('');


  const onSemesterChange = (event)=>{
    setSemester(event.target.value)
  }

  return (
    <div className={css.container}>
      <Form className={css.widget}>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Semester Number</Form.Label>
          <Form.Control type="number" value={semester} onChange={onSemesterChange} placeholder="Enter Semester Number" />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Private Key</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ViewResults;
