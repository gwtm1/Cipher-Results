import React from "react";
// import homeImage from "../assets/homepage.jpeg";
import css from "../css/Homepage.module.css";
import { Button } from "react-bootstrap";

const Homepage = () => {
  return (
    <div className={css.container}>
      {/* <img alt="homepage" src={homeImage} width="100%" /> */}
      <div className={css.textContainer}>
        <div className={css.head}>Results that are only visible to you</div>
        <div className={css.text}>
          <p>
            In our website professors can upload grades and students can view their grades.
            Our website ensures confidentiality of student's grades with the help of Asymmetric Key Encryption.
          </p>
          {/* <p>Asymmetric Key Encryption to ensure confidentiality and</p> */}
        </div>
        <Button id={css.button}>Get Started</Button>
        {/* <Button id={css.button}>Jithendra</Button>
        <Button id={css.button}>Gowtham</Button>
        <Button id={css.button}>Varchas Vutkuri</Button> */}
      </div>
    </div>
  );
};

export default Homepage;
