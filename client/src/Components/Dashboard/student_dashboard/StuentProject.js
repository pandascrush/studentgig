import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function StudentProject() {
<<<<<<< HEAD
  const { id } = useParams();  
=======
  const { id } = useParams();
>>>>>>> 573160953d754583050b6b27aff0273e3a0d8e49
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/basproject/${id}`).then((res) => {
      setProjects(res.data.result.map(project => ({
        ...project,
        formatted_expiry_date: formatExpiryDate(project.expiry_date)
      })));
    });
  }, [id]);

  // Function to format the expiry date
  const formatExpiryDate = (expiryDate) => {
    let date = new Date(expiryDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedTime = hours + ':' + minutes + ' ' + ampm;
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate + ' ' + formattedTime;
  };

  return (
    <div>
<<<<<<< HEAD
     {
      projects.length === 0 ?(
        <h2>Please Update Your Profile</h2>
      ):(
        <table className="table table-hover table-nowrap">
=======
      <table className="table table-hover table-nowrap">
>>>>>>> 573160953d754583050b6b27aff0273e3a0d8e49
        <thead className="thead-light">
          <tr>
            <th scope="col">Serial No</th>
            <th scope="col">Project Name</th>
            <th scope="col">Project Details</th>
            <th>Expires In</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
          {  projects.map((project, index) => (
=======
          {projects.map((project, index) => (
>>>>>>> 573160953d754583050b6b27aff0273e3a0d8e49
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{project.project_name}</td>
              <td>
<<<<<<< HEAD
                <Link to={`/detail/${id}/${project.project_id}`} className="btn btn-success">View</Link>
=======
                <Link to={`/detail/${project.project_id}`} className="btn btn-success">View</Link>
>>>>>>> 573160953d754583050b6b27aff0273e3a0d8e49
              </td>
              <td>{project.formatted_expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
      )
     }
      
=======
>>>>>>> 573160953d754583050b6b27aff0273e3a0d8e49
    </div>
  );
}

export default StudentProject;
