import { React, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import css from "../css/UploadResults.module.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UploadResults = (props) => {
  const navigate = useNavigate();
  const { configToast, isloggedIn } = props;

  useEffect(()=>{
    if(!isloggedIn){
      navigate("/login", { replace: true });
    }
  },[isloggedIn, navigate])

  const [year, setYear] = useState("");
  const [group, setGroup] = useState("");
  const [semesterNumber, setsSemesterNumber] = useState("");
  const [resultsFile, setResultsFile] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const resultsUploadHandler = (event) => {

    event.preventDefault();    
    configToast();
    if(!year || !group || !semesterNumber || !resultsFile){
      toast('Please fill all the fields');
      return;
    }

    const body = new FormData();
    body.append('resultsFile', resultsFile);
    body.append('year', year);
    body.append('group', group);
    body.append('semesterNumber',semesterNumber);
    
    fetch("http://localhost:8080/uploadresults", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "jwtkey": localStorage.getItem("jwtToken"),
        // "Access-Control-Allow-Origin" : "*",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          // alert(data.error);
          toast(data.error);
        } else {
          toast(data.message);
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
          <Form.Label>Group</Form.Label>
          <Form.Control
              className={css.inputs}
              type="string"
              placeholder="Enter group BCS/IMT/IMG "
              value={group}
              onChange={(event) => {
                setGroup(event.target.value);
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
