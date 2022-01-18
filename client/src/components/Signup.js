import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import css from "../css/Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollnumber, setRollNumber] = useState("");
  // const [isStudent, setIsStudent] = useState(true);
  // const [isOptsent, setOtpsent] = useState(false);
  const [OTP, setOTP] = useState();
  const OTPSubmitHandler = () => {
    fetch("http://localhost:8080/signup/emailverify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OTP,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          navigate(`/viewresults`);
        }
      });
  };
  const navigator = () => {
    navigate("/viewresults", { replace: true });
  };

  const formSubmitHandler = () => {
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
        console.log(data);
        if (data.error) {
          alert(data.error);
          navigate("/signup");
        }
        else{
          navigator();
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

  return (
    <Row className={css.mainrow}>
      <Col style={{ marginLeft: "2rem" }} className={css.widget}>
        <Container>
          <Col className="Logos">
            <h1>Signup</h1>
          </Col>
        </Container>
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
          <Link className="signupText" to="/signup">
            Already have an account? Login here
          </Link>
        </Container>
      </Col>
      <Col>
        <div className={css.RightImage} />
      </Col>
    </Row>
  );
};

export default Signup;
