import { React, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import css from "../css/UploadResults.module.css";

const UploadResults = () => {
  // const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [batch, setBatch] = useState("");
  const [semesterNumber, setsSemesterNumber] = useState("");
  const [resultsFile, setResultsFile] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const resultsUploadHandler = (event) => {

    event.preventDefault();

    const body = new FormData();
    body.append('resultsFile.csv', resultsFile);
    body.append('year', year);
    body.append('batch',batch);
    body.append('semesterNumber',semesterNumber);
    
    fetch("http://localhost:8080/uploadresults", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "jwtkey": localStorage.getItem("jwtToken"),
        "Access-Control-Allow-Origin" : "*",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {

          // complete this

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={css.container}>
      
      <Form className={css.widget} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Year</Form.Label>
          <Form.Control
            value={year}
            type="number"
            placeholder="eg: 2019"
            onChange={(event) => {
              setYear(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Batch</Form.Label>
          <Form.Control
              className={css.inputs}
              type="string"
              placeholder="Enter batch BCS/IMT/IMG "
              value={batch}
              onChange={(event) => {
                setBatch(event.target.value);
              }}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Semester Number</Form.Label>
          <Form.Control
            value={semesterNumber}
            type="number"
            placeholder="Enter Semester Number"
            onChange={(event) => {
              setsSemesterNumber(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Results CSV file</Form.Label>
          <Form.Control
            type="file"
            accept=".csv"
            onChange={(event) => {
              setResultsFile(event.target.files[0]);
            }}
          />
        </Form.Group>

        <Button
          onClick={(event) => resultsUploadHandler(event)}
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
