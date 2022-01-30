/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import css from "../css/UploadResults.module.css";

const UploadResults = () => {
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [batch, setBatch] = useState("");
  const [semesterNumber, setsSemesterNumber] = useState("");
  const [resultsFile, setResultsFile] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const resultsUploadHandler = () => {
    // setIsSubmitted(true);
    const body = new FormData();
    body.append(resultsFile);
    body.append({year, batch, semesterNumber})
    fetch("http://localhost:8080/uploadresults", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "JWT-KEY": localStorage.getItem('jwtToken')
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onYearChange = (event) => {
    setYear(event.target.value);
  };
  const onBatchChange = (event) => {
    setBatch(event.target.value);
  };
  const onSemesterNumberChange = (event) => {
    setsSemesterNumber(event.target.value);
  };
  const onResultsFileChange = (event) => {
    setResultsFile(event.target.value);
  };

  return (
    <div className={css.container}>
      <Form className={css.widget}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Year</Form.Label>
          <Form.Control
            value={year}
            type="number"
            placeholder="eg: 2019"
            onChange={onYearChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Batch</Form.Label>
          <Form.Select onChange={onBatchChange}>
            <option>BCS</option>
            <option>IMT</option>
            <option>IMG</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Semester Number</Form.Label>
          <Form.Control
            value={semesterNumber}
            type="number"
            placeholder="Enter Semester Number"
            onChange={onSemesterNumberChange}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Results CSV file</Form.Label>
          <Form.Control type="file" onChange={onResultsFileChange} />
        </Form.Group>

        <Button
          onClick={() => resultsUploadHandler()}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UploadResults;
