import React,{ useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import css from "../css/VerifyOTP.module.css";
// const NodeRSA = require('node-rsa');

const VerifyOTP = (props) => {
  const { userId } = props;
  
  const [OTP, setOTP] = useState("");

  const onOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const download = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const generateKeyPair = () => {
    // const key = new NodeRSA({ b: 1024 });
    // const publicKey = key.exportKey('public');
    // const privateKey = key.exportKey('private');
    // return { publicKey, privateKey };
  };

  const OTPSubmitHandler = () => {
    // const { publicKey, privateKey } = generateKeyPair();

    fetch("http://localhost:8080/signup/emailverify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        OTP,
        // publicKey,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          // download("Private-Key.txt", privateKey);
          navigator(`/login`);
        }
      });
  };

  return (
    <Container className={css.form}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Check your Email</Form.Label>
        <Form.Control
          className={css.inputs}
          type="string"
          placeholder="Enter OTP"
          value={OTP}
          onChange={onOTPChange}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="Submit"
        onClick={() => OTPSubmitHandler()}
      ></Button>
    </Container>
  );
};
export default VerifyOTP;
