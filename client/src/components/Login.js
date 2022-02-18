import css from "../css/Login.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const { loginStatus, collectUserDetails, configToast } = props;

  const navigate = useNavigate();

  const [rollnumber, setRollNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState("");

  const onTabChange = (state) => {
    setIsStudent(state);
  };
  const navigator = (route) => {
    navigate(route);
  };


  const loginSubmitHandler = (event) => {
    event.preventDefault();    
    
    configToast()
    if (isStudent) {

      if (!rollnumber || !studentPassword) {
        toast('Please fill all details');
        return;
      }

      fetch("http://localhost:8080/login/student", {
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
            toast(data.error)
            // alert(data.error);
          } else {
            // createToken(data.jwtToken);
            toast(data.message)
            localStorage.setItem("jwtToken", data.jwtToken);
            collectUserDetails(data.userId);
            loginStatus(true);
            navigator("/viewresults");
          }
        })
        .catch((err) => {
          console.log(err);
          toast('Oops! Something went wrong 😥')
        });
    } else {

      if (!email || !adminPassword) {
        toast('Please fill all feilds');
        return;
      }

      fetch("http://localhost:8080/login/admin", {
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
          toast('Oops! Something went wrong 😥')
        });
    }
  };

  return (
    
    <form  onSubmit={(event) => loginSubmitHandler(event)}>
    <Row className={css.mainrow}>
      <Col style={{ marginLeft: "1.5rem" }} className={css.widget}>
        <Container>
          <Col className={css.Logos}>
            <h1>Login</h1>
          </Col>
          <Row>
            <Nav variant="tabs" className="navs">
              <Nav.Item className={css.leftNav}>
                <Nav.Link onClick={() => onTabChange(true)}>Student</Nav.Link>
              </Nav.Item>
              <Nav.Item className={css.rightNav}>
                <Nav.Link onClick={() => onTabChange(false)}>Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
        </Container>
        {isStudent ? (
          <Container className={css.form}>
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

            <Button
              variant="primary"
              type="submit"
              onClick={() => loginSubmitHandler()}
            >
              Submit
            </Button>

            <p className={css.dividingLine}>&#8195;Or&#8195;</p>
            <Link className={css.LoginText} to="/signup">
              Don’t have an account? Sign Up here
            </Link>
          </Container>
        ) : (
          <Container className={css.form}>
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

            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Container>
        )}
      </Col>
      <Col>
        <div className={css.RightImage} />
      </Col>
    </Row>
    </form>
  );
};

export default Login;
