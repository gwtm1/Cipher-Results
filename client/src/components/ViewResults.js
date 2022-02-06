import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import css from "../css/ViewResults.module.css";

const ViewResults = (props) => {
  const { userId } = props;
  const [semester, setSemester] = useState("");
  const [privateKeyFile, setPrivateKeyFile] = useState("");

  const resultsViewHandler = () => {

    const body = new FormData();
    body.append(privateKeyFile);
    body.append({ semester, userId });
    fetch("http://localhost:8080/viewresults", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "JWT-KEY": localStorage.getItem("jwtToken"),
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

  return (
    <div className={css.container}>
      <Form className={css.widget}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Semester Number</Form.Label>
          <Form.Control
            type="number"
            value={semester}
            onChange={(event) => {
              setSemester(event.target.value);
            }}
            placeholder="Enter Semester Number"
          />
        </Form.Group>

        <Form.Group
          controlId="formFile"
          onChange={(event) => {
            setPrivateKeyFile(event.target.value);
          }}
          className="mb-3"
        >
          <Form.Label>Upload Private Key</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => resultsViewHandler()}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ViewResults;
