import css from "../css/Login.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const { loginStatus, collectUserDetails, configToast } = props;

  const navigate = useNavigate();

  const [rollnumber, setRollNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState("");


  const navigator = (route) => {
    navigate(route);
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    configToast();
    if (isStudent) {
      if (!rollnumber || !studentPassword) {
        toast("Please fill all details");
        return;
      }

      fetch("https://cipher-results-api.herokuapp.com/login/student", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollnumber,
          studentPassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast(data.error);
            // alert(data.error);
          } else {
            // createToken(data.jwtToken);
            toast(data.message);
            localStorage.setItem("jwtToken", data.jwtToken);
            collectUserDetails(data.userId);
            loginStatus(true);
            navigator("/viewresults");
          }
        })
        .catch((err) => {
          console.log(err);
          toast("Oops! Something went wrong 😥");
        });
    } else {
      if (!email || !adminPassword) {
        toast("Please fill all feilds");
        return;
      }

      fetch("https://cipher-results-api.herokuapp.com/login/admin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          adminPassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            // alert(data.error);
            toast(data.error);
          } else {
            toast(data.message);
            localStorage.setItem("jwtToken", data.jwtToken);
            loginStatus(true);
            navigator("/uploadresults");
          }
        })
        .catch((err) => {
          console.log(err);
          toast("Oops! Something went wrong 😥");
        });
    }
  };

  return (
    <Row className={css.mainrow}>
      <Col>
        <Container className={css.formContainer}>
          {isStudent ? (
            <>
              <div className={css.widget}>
                <div>
                  <Col className={css.heading}>
                    <h1>Login</h1>
                  </Col>
                  <Col onClick={() => setIsStudent(false)} className={css.toggle}>
                    Student &#9660;
                  </Col>
                </div>
                <form className={css.form} onSubmit={(event) => loginSubmitHandler(event)}>
                  <Form.Group className="mb-3" controlId="formBasicRollNumber">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control
                      className={css.inputs}
                      type="string"
                      placeholder="Enter Roll Number"
                      value={rollnumber}
                      onChange={(event) => {
                        setRollNumber(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className={css.inputs}
                      type="password"
                      placeholder="Password"
                      value={studentPassword}
                      onChange={(event) => {
                        setStudentPassword(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" id={css.button}>
                    Submit
                  </Button>
                </form>
                <p className={css.dividingLine}>&#8195;Or&#8195;</p>
                <Link className={css.loginText} to="/signup">
                  Don’t have an account? Sign Up here
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={css.widget}>
                <div>
                  <Col className={css.heading}>
                    <h1>Login</h1>
                  </Col>
                  <Col onClick={() => setIsStudent(true)} className={css.toggle}>
                    Admin &#9650;
                  </Col>
                </div>
                <form className={css.form} onSubmit={(event) => loginSubmitHandler(event)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className={css.inputs}
                      type="email"
                      placeholder="Enter college Email"
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
                      value={adminPassword}
                      onChange={(event) => {
                        setAdminPassword(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" id={css.button}>
                    Submit
                  </Button>
                </form>
              </div>
            </>
          )}
        </Container>
      </Col>
      <Col>
        <div className={css.RightImage} />
      </Col>
    </Row>
  );
};

export default Login;
