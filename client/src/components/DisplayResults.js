import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const DisplayResults = (props) => {
  const { results, isloggedIn } = props;
  const { sub1, sub2, sub3 } = JSON.parse(results);

  console.log(Object.keys(results));

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
        {/* {Object.keys(results).map((subject) => (
          <tr>
            <td>{subject}</td> <td> {results[subject]}</td>
          </tr>
        ))} */}
        <tr>
          <td>Subject1</td>
          <td>{sub1}</td>
        </tr>
        <tr>
          <td>Subject2</td>
          <td>{sub2}</td>
        </tr>
        <tr>
          <td>Subject3</td>
          <td>{sub3}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DisplayResults;
