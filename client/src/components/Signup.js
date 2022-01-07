import "../css/Login.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Signup";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [isOptsent, setOtpsent] = useState(false);
  const [rollNumber, setRollNumber] = useState("");

  const formSubmitHandler = (event) => {};
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onrollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onTabChange = (state) => {
    setIsStudent(state);
  };

  return (
    <Row className="mainrow">
      <Col style={{ marginLeft: "1.5rem" }} className="widget">
        <Container>
          <Col className="Logos">
            <h1>Signup</h1>
          </Col>
          <Row>
            <Nav variant="tabs" className="navs">
              <Nav.Item className="leftnav">
                <Nav.Link onClick={() => onTabChange(true)}>Student</Nav.Link>
              </Nav.Item>
              <Nav.Item className="rightnav">
                <Nav.Link onClick={() => onTabChange(false)}>Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
        </Container>
        {isStudent ? (
          <form onSubmit={(event) => formSubmitHandler(event)} className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter E-mail "
                value={email}
                onChange={onEmailChange}
              />
              <Form.Group className="mb-3" controlId="formBasicRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={onrollNumberChange}
              />
            </Form.Group>
            </Form.Group>
            {isOptsent ? (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            ) : (
                <></>
            )}

            <Button variant="primary" type="submit" onClick={()=> {setOtpsent(true)}}>
              Submit
            </Button>

            <p className="dividing-line my-3">&#8195;Or&#8195;</p>
            <Link className="signupText" to="/signup">
              Already have an account? Login here
            </Link>
          </form>
        ) : (
          <form onSubmit={(event) => formSubmitHandler(event)} className="form">
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

            <p className="dividing-line my-3">&#8195;Or&#8195;</p>
            <Link className="LoginText" to="/Login">
              Already have an account? Login here
            </Link>
          </form>
        )}
      </Col>
      <Col>
        <div className="RightImage" />
      </Col>
    </Row>
  );
};

export default Login;
