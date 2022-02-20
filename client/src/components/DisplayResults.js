import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import css from '../css/DisplayResults.module.css'

const DisplayResults = (props) => {
  
  const { results, isloggedIn } = props;
  // const results = { "rollnumber":"2019IMT-058", sub1: 100, sub2: 200, sub3: 400, sub4: 60, sub5: 90 };
  // const { sub1, sub2, sub3 } = results;

  const grades = JSON.parse(results);
  console.log("hello", grades);

  const navigate = useNavigate();

    useEffect(() => {
      if (!isloggedIn) {
        navigate("/login", { replace: true });
      }
    }, [isloggedIn, navigate]);

  return (
  <div className={css.container}>
    <div className={css.heading}>Grade Report</div>
    <div className={css.rollnumber}>{grades.rollnumber}</div>

    <table bordered hover variant="dark">
      <thead>
        <tr>
          <th> Subject </th>
          <th> Grade </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(grades).map((subject) => {
          if (subject !== 'rollnumber') {
            return (
              <tr>
                <td>{subject}</td> <td> {grades[subject]}</td>
              </tr>
            )
          } else return ''
        })}
      </tbody>
    </table>
    </div>
  );
};

export default DisplayResults;
