import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import css from "../css/ViewResults.module.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const NodeRSA = require("node-rsa");

const ViewResults = (props) => {
  const navigate = useNavigate();

  const { userId, configToast, isloggedIn, collectResults } = props;
  useEffect(()=>{
    if(!isloggedIn){
      navigate("/login", { replace: true });
    }
  },[isloggedIn, navigate])
  
  const [semester, setSemester] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const resultsViewHandler = (event) => {
    event.preventDefault();
    configToast();

    if(!userId || !semester || !privateKey){
      toast('Please fill all the fields');
      return;
    }

    fetch("http://localhost:8080/viewresults", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        jwtkey: localStorage.getItem("jwtToken"),
        // "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({ semester, userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // alert(data.error);
          toast(data.error)
        } else {
          // complete this
          decryptResults(data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast('Oops! Something went wrong 😥')
      });
  };

  const decryptResults = (data) => {
    const private_key = new NodeRSA(privateKey);
    const decryptedResult = private_key.decrypt(data.result, "utf8");
    console.log(decryptedResult)
    collectResults(decryptedResult);
    navigate("/viewresults/display", { replace: true })
  };

  const onPrivateKeyFileChange = (event) => {
    var fileReader = new FileReader();
    fileReader.onload = onFileLoad;
    fileReader.readAsText(event.target.files[0]);
  };

  const onFileLoad = (event) => {
    setPrivateKey(event.target.result);
  };

  return (
    <div className={css.container}>
      <Form className={css.widget} encType="multipart/form-data">
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

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Private Key</Form.Label>
          <Form.Control
            type="file"
            onChange={(event) => {
              onPrivateKeyFileChange(event);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={(event) => resultsViewHandler(event)}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ViewResults;
