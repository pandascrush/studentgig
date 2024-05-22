import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Studentmenu.css";

function ProjectDeatails() {
  const { id } = useParams();

  const [projectDetails, setProjectDetails] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/stu/prodeatil/${id}`).then((res) => {
      console.log(res.data);
      setProjectDetails(
        res.data.map((project) => ({
          ...project,
          formatted_expiry_date: formatExpiryDate(project.expiry_date),
        }))
      );
    });
  }, [id]);

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
      {projectDetails.map((val, ind) => (
        <div className="project-details-container">
          <div className="project-details">
            <h2>{val.project_name}</h2>
            <p>Description: {val.project_description}</p>
            <p>Expiry Date: {val.formatted_expiry_date}</p>
            <p>Stack Name: {val.skill_name}</p>
            <button className="edit-button">Bit</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectDeatails;
