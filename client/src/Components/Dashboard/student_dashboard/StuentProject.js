import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function StudentProject() {
  const { id } = useParams();
  const decoded = atob(id)
  // console.log(decoded,id);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/basproject/${decoded}`).then((res) => {
      setProjects(
        res.data.result.map((project) => ({
          ...project,
          formatted_expiry_date: formatExpiryDate(project.expiry_date),
        }))
      );
    });
  }, [decoded]);

  // Function to format the expiry date
  const formatExpiryDate = (expiryDate) => {
    let date = new Date(expiryDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedTime = hours + ":" + minutes + " " + ampm;
    let options = { year: "numeric", month: "long", day: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate + " " + formattedTime;
  };

  return (
    <div>
      {projects.length === 0 ? (
        <h2>Please Update Your Profile</h2>
      ) : (
        <table className="table table-hover table-nowrap">
          <thead className="thead-light">
            <tr>
              <th scope="col">Serial No</th>
              <th scope="col">Project Name</th>
              <th scope="col">Project Details</th>
              <th>Expires In</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{project.project_name}</td>
                <td>
                  <Link
                    to={`/detail/${id}/${btoa(project.project_id)}`}
                    className="btn btn-success"
                  >
                    View
                  </Link>
                </td>
                <td>{project.formatted_expiry_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentProject;
