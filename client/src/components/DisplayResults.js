import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form } from "react-bootstrap";

const DisplayResults = (props) => {
  const { results, isloggedIn } = props;
  const { sub1, sub2, sub3 } = JSON.parse(results);

  console.log();
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isloggedIn){
      navigate("/login", { replace: true });
    }
  },[isloggedIn, navigate])

  return(
    <div>
       <div >Results</div>
       <div> sub1 : {sub1} </div>
       <div> sub2 : {sub2} </div>
       <div> sub3 : {sub3} </div>
    </div>
  );

};

export default DisplayResults;
