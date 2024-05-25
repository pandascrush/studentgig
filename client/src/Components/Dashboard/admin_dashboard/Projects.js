import axios from "axios";
import React, { useEffect, useState } from "react";
import "../student_dashboard/Studentmenu.css";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

function Projects() {
  const [notificationCount, setNotificationCount] = useState(5);
  const [Projects, setProjects] = useState([]);
  const [Projectscount, setProjectscount] = useState([]);

  
  useEffect(() => {
    axios.get("http://localhost:5000/admin/getallprojects").then((res) => {
      console.log(res.data);
      setProjects(
        res.data.map((project) => ({
          ...project,
          formatted_expiry_date: formatExpiryDate(project.expiry_date),
          formatted_created_at: formatExpiryDate(project.created_at),
        }))
      );
    });
    fetch("http://localhost:5000/admin/getbit")
    .then(res=>res.json())
    .then(data=>setProjectscount(data))
  }, []);

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

  const styles = {
    notificationIcon: {
      position: "relative",
      display: "inline-block",
      marginRight: "20px",
    },
    notificationCount: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      background: "red",
      color: "white",
      borderRadius: "50%",
      padding: "5px 10px",
      fontSize: "9px",
    },
  };

  return (
    <div>
      <h1 className="text-muted m-2">Projects</h1>
      {Projects.map((val, ind) => (
        <div className="project-details-container">
          <div className="project-details">
            <div className="d-flex justify-content-between">
              <h2>{val.project_name}</h2>
              <Link className="text-dark" to={`/bit/${btoa(val.project_id)}`}>
                <div
                  className="notification-icon"
                  style={styles.notificationIcon}
                >
                  <FaBell size={24} />
                  {notificationCount > 0 && (
                    <span
                      className="notification-count"
                      style={styles.notificationCount}
                    >
                      {val.bit_count}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <p>Description: {val.description}</p>
            <p>Created at: {val.formatted_created_at}</p>
            <p>Expiry Date: {val.formatted_expiry_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
