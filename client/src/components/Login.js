import css from "../css/Login.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState("");

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
    if (isStudent) {
      fetch("/login/student", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNumber,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            navigate("/viewresults");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("/login/admin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            navigate("/uploadresults");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Row className={css.mainrow}>
      <Col style={{ marginLeft: "1.5rem" }} className={css.widget}>
        <Container>
          <Col className={css.Logos}>
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
          <form className={css.form}>
            <Form.Group className="mb-3" controlId="formBasicRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                className={css.inputs}
                type="string"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={onrollNumberChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={css.inputs}
                type="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={() => formSubmitHandler()}
            >
              Submit
            </Button>

            <p className={css.dividingLine}>&#8195;Or&#8195;</p>
            <Link className={css.LoginText} to="/signup">
              Don’t have an account? Sign Up here
            </Link>
          </form>
        ) : (
          <form onSubmit={(event) => formSubmitHandler(event)} className={css.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={css.inputs}
                type="email"
                placeholder="Enter college Email"
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
                value={password}
                onChange={onPasswordChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

            <p className={css.dividingLine}>&#8195;Or&#8195;</p>
            <Link className={css.loginText} to="/signup">
              Don’t have an account? Sign Up here
            </Link>
          </form>
        )}
      </Col>
      <Col>
        <div className={css.RightImage} />
      </Col>
    </Row>
  );
};

export default Login;
