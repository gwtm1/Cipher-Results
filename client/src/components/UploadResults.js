import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import css from "../css/UploadResults.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

const UploadResults = (props) => {
  const navigate = useNavigate();
  const { configToast, isloggedIn } = props;

  useEffect(() => {
    if (!isloggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isloggedIn, navigate])

  const [year, setYear] = useState("");
  const [group, setGroup] = useState("");
  const [semesterNumber, setsSemesterNumber] = useState("");
  const [resultsFile, setResultsFile] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const resetStates = () => {
    setYear('');
    setGroup('');
    setsSemesterNumber('');
    setResultsFile('');
  }

  const resultsUploadHandler = (event) => {
    event.preventDefault();
    configToast();
    const groups = ['IMT', 'BCS', 'IMG'];
    if (!year || !group || !semesterNumber || !resultsFile) {
      toast("Please fill all the fields");
      return;
    }
    else if (year > 2030 || year < 1980 || semesterNumber > 10 || semesterNumber < 0 || !groups.includes(group)) {
      toast("Enter valid inputs");
      return;
    }
    const formData = new FormData();
    formData.append("resultsFile", resultsFile);
    formData.append("year", year);
    formData.append("group", group);
    formData.append("semesterNumber", semesterNumber);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    fetch("http://localhost:8080/uploadresults", {
      method: "post",
      headers: {

        jwtkey: localStorage.getItem("jwtToken"),
        // "Access-Control-Allow-Origin" : "*",
      },
      body: formData,
    })
      .then((res) => res.json())
      // axios.post("http://localhost:8080/uploadresults", formData, {
      //   headers: { jwtkey: localStorage.getItem("jwtToken") }
      // })
      .then((data) => {
        console.log(data);
        if (data.error) {
          // alert(data.error);
          toast(data.error);
        } else {
          toast(data.message);
          resetStates();
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Oops! Something went wrong 😥");
      });
  };

  return (
    <div className={css.container}>
      <Form className={css.widget} encType="multipart/form-data">
        <div className={css.heading}>Upload Results</div>

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
            placeholder="BCS/IMT/IMG "
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
            placeholder="Semester Number"
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
          variant="dark"
          id={css.button}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UploadResults;
