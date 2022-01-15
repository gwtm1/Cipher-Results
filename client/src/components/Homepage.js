import React from "react";
import homeImage from "../assets/homepage.jpeg";
import css from "../css/Homepage.module.css";

const Homepage = () => {
  return (
    <div className={css.container}>
      <img alt="homepage" src={homeImage} width="100%" />
      <div className={css.textContainer}>
        <div className={css.head}>
          Cipher Results
        </div>
        <div className={css.text}>
        <p>Our website ensures confidentiality of student's grades with the help of Asymmetric Key Encryption.</p>
        <p>Asymmetric Key Encryption to ensure confidentiality and</p> 
        </div>
      </div>
    </div>
  );
};

export default Homepage;
