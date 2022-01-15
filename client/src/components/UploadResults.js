import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import css from "../css/Upload.module.css";

const UploadResults = () => {
  // const [Year, setYear] = useState("");
  // const [Batch, setBatch] = useState("");
  // const [SemesterNumber, setsSemesterNumber] = useState("");
  // const [state, setstate] = useState("");

  fetch("http://localhost:8080/signup/student", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Year,
      // Batch,
      // Semester,
      // ResultsJson
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        // navigate("/viewresults");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className={css.container}>
      <Form className={css.widget}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" placeholder="eg: 2019" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Batch</Form.Label>
          <Form.Select>
            <option>BCS</option>
            <option>IMT</option>
            <option>IMG</option>
          </Form.Select>
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

export default UploadResults;
