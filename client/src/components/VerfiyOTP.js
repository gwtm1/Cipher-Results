import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import css from "../css/VerifyOTP.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NodeRSA = require("node-rsa");

const VerifyOTP = (props) => {
  const { userId, configToast } = props;
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");

  const onOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const navigator = (endpoint) => {
    navigate(endpoint, { replace: true });
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
    const key = new NodeRSA({ b: 1024 });
    const publicKey = key.exportKey("public");
    const privateKey = key.exportKey("private");
    return { publicKey, privateKey };
  };

  const OTPSubmitHandler = (event) => {
    event.preventDefault();
    configToast();
    if (!OTP) {
      toast("Please enter OTP");
      return;
    }

    const { publicKey, privateKey } = generateKeyPair();

    fetch("http://localhost:8080/signup/emailverify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        OTP,
        publicKey,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast(data.error);
          // alert(data.error);
        } else {
          toast(data.message);
          download(`${data.rollnumber} - Private-Key.txt`, privateKey);
          navigator(`/login`);
        }
      }).catch((err) => {
        console.log(err);
        toast("Oops! Something went wrong 😥");
      });
  };

  return (
    <form
      onSubmit={(event) => OTPSubmitHandler(event)}
      className={css.container}
    >
      <Container className={css.widget}>
        <div className={css.heading}>Verification</div>

        <Form.Group className="mb-3">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control
            className={css.inputs}
            type="string"
            placeholder="OTP"
            value={OTP}
            onChange={onOTPChange}
          />
        </Form.Group>

        <Button variant="dark" type="Submit" className={css.button}>
          Submit
        </Button>
      </Container>
    </form>
  );
};
export default VerifyOTP;
