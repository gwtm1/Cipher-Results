import React,{useState} from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import unnamed from '../assets/unnamed.jpg'
import { Link } from 'react-router-dom'


const Signup = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rollNumber,setRollNumber] = useState('');
  // const [errorMsg, setErrorMsg] = useState("");

  const formSubmitHandler = (event) => {};
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <Row className='mainrow'>
    <Col style={{"marginLeft": "1.5rem"}}>
            <form onSubmit={(event) => formSubmitHandler(event)} className='widget'>

              <Container>
                <Row className='formTitle'>
                  <Col><h1>SignUp</h1></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col >
                    <img alt="Logo" className='Logo' src={unnamed} />
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
              <Form.Group className="mb-3" controlId="formBasicRollNumber">
                <Form.Label>Roll Number</Form.Label>
                <Form.Control
                  type='string'
                  placeholder="Enter email"
                  value={rollNumber}
                  onChange={onRollNumberChange}
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
              <Link className="signupText" to="/signup">Already have an account? Login here</Link>

            </form>
            </Col>

            <Col>
              <div className='RightImage' />
            </Col>
            </Row>
        
  );
}

export default Signup
