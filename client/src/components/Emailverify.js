import React,{ useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import css from "../css/Signup.module.css";

const Emailverify=()=> {

    const navigate = useNavigate();
    const [OTP,setOTP] = useState();
    const onOTPChange = (event)=>{
        setOTP(event.target.value)
    }
    const OTPSubmitHandler = (event)=>{
      fetch("http://localhost:8080/signup/emailverify", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OTP
          }),
        })
        .then(res=>res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            navigate("/viewresults");
          }
        })
  }

    return (
        <Row className={css.mainrow}>
      <Col style={{ marginLeft: "2rem" }} className={css.widget}>
        <Container>
          <Col className="Logos">
            <h1>Email Verification</h1>
          </Col>
          
        </Container>
        
          <form onSubmit={(event) => OTPSubmitHandler(event)} className={css.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                className={css.inputs}
                type="email"
                placeholder="Check email for OTP"
                value={OTP}
                onChange={onOTPChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </form>
        
      </Col>
      <Col>
        <div className={css.RightImage} />
      </Col>
    </Row>
    )
}

export default Emailverify
