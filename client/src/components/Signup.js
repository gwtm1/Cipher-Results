import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import css from "../css/Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [isOptsent, setOtpsent] = useState(false);

  const formSubmitHandler = (event) => {
    if (isStudent) {
      fetch("http://localhost:8080/signup/student", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNumber,
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
            navigate("/viewresults");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("http://localhost:8080/signup/admin", {
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
    <Row className={css.mainrow}>
      <Col style={{ marginLeft: "2rem" }} className={css.widget}>
        <Container>
          <Col className="Logos">
            <h1>Signup</h1>
          </Col>
          <Row>
            <Nav variant="tabs" className='navs'>
              <Nav.Item className='leftnav' >
                <Nav.Link onClick={() => onTabChange(true)}>Student</Nav.Link>
              </Nav.Item>
              <Nav.Item className= 'rightnav' >
                <Nav.Link onClick={() => onTabChange(false)}>Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
        </Container>
        {isStudent ? (
          <form onSubmit={(event) => formSubmitHandler(event)} className={css.form}>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={css.inputs}
                type="string"
                placeholder="Enter E-mail "
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
            {/* {isOptsent ? (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            ) : (
              <></>
            )} */}

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setOtpsent(true);
              }}
            >
              Submit
            </Button>

            <p className={css.dividingLine}>&#8195;Or&#8195;</p>
            <Link className="signupText" to="/signup">
              Already have an account? Login here
            </Link>
          </form>
        ) : (
          <form onSubmit={(event) => formSubmitHandler(event)} className={css.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={css.inputs}
                type="email"
                placeholder="Enter email"
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

            <p className="dividing-line my-3">&#8195;Or&#8195;</p>
            <Link className={css.signupText} to="/Login">
              Already have an account? Login here
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

export default Signup;
