/* eslint-disable no-unused-vars */

import "../css/Login.css";
// import { Button, FormGroup, FormText, Input } from "reactstrap";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
// import unnamed from "../assets/unnamed.jpg";
import { Link, useNavigate } from "react-router-dom";
// import css from "../css/Login.css";
import { Nav } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState('');
  // const [errorMsg, setErrorMsg] = useState("");

  const onrollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };
  
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onTabChange = (state) => {
    setIsStudent(state);
  };
  const formSubmitHandler = () => {
    if(isStudent){
      fetch("/login/student", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rollNumber,
            password
        })
      }).then(res => res.json())
          .then(data => {
              console.log(data)
              if (data.error) {
                  alert(data.error)
              } else {
                  navigate('/student')
              }
          }).catch(err => {
              console.log(err)
          })
    }
    else {
      fetch("/login/admin", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
      }).then(res => res.json())
          .then(data => {
              console.log(data)
              if (data.error) {
                  alert(data.error)
              } else {
                  navigate('/admin')
              }
          }).catch(err => {
              console.log(err)
          })
    }
  }

  
  return (
    <Row className="mainrow">
      <Col style={{ marginLeft: "1.5rem" }} className="widget">
        <Container>
          <Col className="Logos">
            <h1>Login</h1>
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
          <form  className="form">

            <Form.Group className="mb-3" controlId="formBasicRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={onrollNumberChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="inputs"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
              />
            </Form.Group>
            

            <Button variant="primary" type="submit" onClick={()=>formSubmitHandler()}>
              Submit
            </Button>

            <p className="dividing-line my-3">&#8195;Or&#8195;</p>
            <Link className="signupText" to="/signup">
              Don’t have an account? Sign Up here
            </Link>
          </form>
        ) : (
          <form onSubmit={(event) => formSubmitHandler(event)} className="form">
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter college Email"
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
            <Link className="signupText" to="/signup">
              Don’t have an account? Sign Up here
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
