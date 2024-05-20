import axios from "axios";
import React, { useEffect, useState } from "react";

function StudentsData() {
  const [testdata, setTestdata] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/studata").then((res) => {
      console.log(res.data.result);
      setTestdata(res.data.result);
    });
  },[]);

  return (
    <div>
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Student id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Degree</th>
            <th scope="col">Specialization</th>
            <th scope="col">Year</th>
          </tr>
        </thead>
        <tbody>
          {testdata.map((value, index) => (
            <tr>
              <td>{value.student_id}</td>
              <td>{value.name}</td>
              <td>{value.email}</td>
              <td>{value.degree}</td>
              <td>{value.specialization}</td>
              <td>
               
                  {value.year}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsData;
