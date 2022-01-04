/* eslint-disable no-unused-vars */

import styles from "styled-components";
import loginImage from "../assets/loginImage.svg";
import Widjet from "./Widjet";
import { Button, FormGroup, FormText, Input } from "reactstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LeftImage = styles.div`
  background-image: url(${loginImage});
  background-repeat: no-repeat;
  background-position: right center;
  width: 1000px;
  height: 1200px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");

  const doLogin = (event) => {};
  const changeCreds = (event) => {};

  return (
    <div>
      <Widjet>
        <form onSubmit={(event) => doLogin(event)}>
          <FormGroup>
            <FormText>Email</FormText>
            <Input
              id="email"
              value={email}
              onChange={(event) => changeCreds(event)}
              type="email"
              required
              name="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <FormText>Password</FormText>
            <Input
              id="password"
              value={password}
              onChange={(event) => changeCreds(event)}
              type="password"
              required
              name="password"
              placeholder="Password"
            />
          </FormGroup>
          <div>
            <Button type="submit">Login</Button>
          </div>
          <Link to="/signup">Don’t have an account? Sign Up here</Link>
        </form>
      </Widjet>
      <LeftImage />
    </div>
  );
};

export default Login;
