import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import css from "../css/Signup.module.css";
// const NodeRSA = require('node-rsa');

const Signup = (props) => {
  const { userId, loginStatus, collectUserDetails, createToken: saveJWTToken } = props;

  const navigate = useNavigate();
  const [rollnumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [isOptsent, setOtpsent] = useState(false);
  const [loading, setLoading] = useState(false)
  
  const navigator = (endpoint) => {
    navigate(endpoint, { replace: true });
  };

  const download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
 
    element.style.display = 'none';
    document.body.appendChild(element);
 
    element.click();
 
    document.body.removeChild(element);
  }

  const generateKeyPair = () =>{
    
    // const key = new NodeRSA({ b: 1024 });
    
    // const publicKey = key.exportKey('public');
    // const privateKey = key.exportKey('private');
    // return { publicKey, privateKey };
  }

  const OTPSubmitHandler = () => {
    const {publicKey, privateKey} = generateKeyPair();
    
    fetch("http://localhost:8080/signup/emailverify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        OTP,
        publicKey
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {

          loginStatus(true)
          saveJWTToken(data.jwtToken)
          download('Private-Key.txt', privateKey);
          navigator(`/viewresults`);
        }
      });
  };
 

  const formSubmitHandler = () => {
    setLoading(true)
    fetch("http://localhost:8080/signup/student", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollnumber,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          navigator("/signup");
        } else {
          collectUserDetails(data.userId);
          setOtpsent(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onrollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onOTPChange = (event) => {
    setOTP(event.target.value);
  };

  return (
    <Row className={css.mainrow}>
      <Col style={{ marginLeft: "2rem" }} className={css.widget}>
        <Container>
          <Col className="Logos">
            <h1>Signup</h1>
          </Col>
        </Container>
        {!isOptsent ? (
          <Container className={css.form}>
            <Form.Group className="mb-3" controlId="formBasicRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                className={css.inputs}
                type="string"
                placeholder="20XXBCS-XXX or 20XXIMT-XXX or 20XXIMG-XXX"
                value={rollnumber}
                onChange={onrollNumberChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={css.inputs}
                type="string"
                placeholder="Enter college mailId "
                value={email}
                onChange={onEmailChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={css.inputs}
                type="password"
                placeholder="Password"
                value={OTP}
                onChange={onOTPChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="Send OTP"
              onClick={() => formSubmitHandler()}
            >
             {loading ?'Loading...' :'Submit'}
            </Button>

            <p className={css.dividingLine}>&#8195;Or&#8195;</p>
            <Link className="signupText" to="/signup">
              Already have an account? Login here
            </Link>
          </Container>
        ) : (
          <Container className={css.form}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                className={css.inputs}
                type="string"
                placeholder="OTP"
                value={password}
                onChange={onPasswordChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="Submit"
              onClick={() => OTPSubmitHandler()}
            >
              {loading ? 'Loading...' :'Submit'}
            </Button>
          </Container>
        )}
      </Col>
      <Col>
        <div className={css.RightImage} />
      </Col>
    </Row>
  );
};

export default Signup;
