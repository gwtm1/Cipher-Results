import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const DisplayResults = (props) => {
  const { results, isloggedIn } = props;
  // const results = { sub1: 100, sub2: 200, sub3: 400, sub4: 60, sub5: 90 };
  // const { sub1, sub2, sub3 } = results;

  const grades = JSON.parse(results);
  console.log(props, "hello", grades);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isloggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isloggedIn, navigate]);

  return (
    <Table bordered hover variant="dark">
      {/* <thead>
        <tr>
          <th> {} </th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th> Subject </th>
        </tr>
      </thead> */}
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
    </Table>
  );
};

export default DisplayResults;
