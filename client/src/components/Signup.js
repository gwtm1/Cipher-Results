import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import css from "../css/Signup.module.css";

const Signup = (props) => {
  const { collectUserDetails } = props;

  const navigate = useNavigate();
  const [rollnumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigator = (endpoint) => {
    navigate(endpoint, { replace: true });
  };

  const setstates = () => {
    setLoading(false);
  };

  const formSubmitHandler = () => {
    setLoading(true);
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
          setstates();
          collectUserDetails(data.userId);
          navigator("/signup/verifyotp");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              onChange={(event) => {
                setRollNumber(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={css.inputs}
              type="email"
              placeholder="Enter college mailId "
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={css.inputs}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="Send OTP"
            onClick={() => formSubmitHandler()}
          >
            {loading ? "Loading..." : "Submit"}
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
