/* eslint-disable no-unused-vars */

import "../css/Login.css";
// import { Button, FormGroup, FormText, Input } from "reactstrap";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";

import css from '../css/Login.css'

const Login = () => {
  const [state, setState] = useState({
    email: 'admin@cipherresults.com',
    password: 'password',
  })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");

  const formSubmitHandler = (event) => {};
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
      <Row className='mainrow'>
        <Col>
            <form onSubmit={(event) => formSubmitHandler(event)} className='widget'>

              <Container>
                <Row className='formTitle'>
                  <Col><h1>Login</h1></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col className='Logo'>
                    <img alt="Logo" width="3rem" height="3rem" src='..\assets\unnamed.jpg' />
                  </Col>
                </Row>
              </Container>

              <div className='formDescription'>
                This is real app with Node.js backend - use
                <b>"admin@cipherresults.com/password</b> to login.
              </div>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onEmailChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onPasswordChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>

              {/* <Link to="/signup">Don’t have an account? Sign Up here</Link> */}

              <p className="dividing-line my-3">&#8195;Or&#8195;</p>
              <div className="signupText">
                Don't have an account? Sign Up Here.
              </div>

            </form>
        </Col>

        <Col>
          <div className='RightImage' />
        </Col>
      </Row>
  );
};

export default Login;
