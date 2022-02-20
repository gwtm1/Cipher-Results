import React from "react";
import homeImage from "../assets/home.jpeg";
import css from "../css/Homepage.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Homepage = () => {
  
  
  return (
    <div className={css.mainrow}>
      <div className={css.container}>
        <div className={css.textContainer}>
          <div className={css.head}>Results that are visible</div>
          <div className={css.head}>only to you</div>
          <div className={css.text}>
            <p>
              Our website provides professors to upload grades and students to view
              their grades. Our website ensures confidentiality of student's
              grades with the help of Asymmetric Key Encryption.
            </p>
            {/* <p>Asymmetric Key Encryption to ensure confidentiality and</p> */}
          </div>
          <Button id={css.button} as={Link} to="/signup">Get Started &#8594;</Button>
          {/* <Button id={css.button}>Jithendra</Button>
        <Button id={css.button}>Gowtham</Button>
        <Button id={css.button}>Varchas Vutkuri</Button> */}
        </div>
      </div>
      <div >
        <img
          alt="homepage"
          src={homeImage}
          className={css.image}
        />
      </div>
    </div>
  );
};

export default Homepage;
