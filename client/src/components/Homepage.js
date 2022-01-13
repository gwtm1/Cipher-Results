import React from "react";
import homeImage from "../assets/homepage.jpeg";
import css from "../css/Homepage.module.css";

const Homepage = () => {
  return (
    <div className={css.container}>
      <img alt="homepage" src={homeImage} width="100%" />
      <div className={css.textContainer}>
        <div className={css.text}>
          More Chances Ajinkya Rahane Gets, Fewer Opportunities For Hanuma
          Vihari and Shreyas Iyer: Sanjay Manjrekar.
        </div>
      </div>
    </div>
  );
};

export default Homepage;
