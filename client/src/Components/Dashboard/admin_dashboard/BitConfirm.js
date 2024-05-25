import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BitConfirm() {
  const { id } = useParams();
  const decoded = atob(id)

  const [bitInfo, setBitInfo] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/bittedDetail/${decoded}`).then((res) => {
      console.log(res.data);
      setBitInfo(res.data);
    });
  }, [id]);

  const handleClick = (stuid, proid,email) => {  
    axios
      .post(`http://localhost:5000/admin/accept/${stuid}/${proid}`,{email})
      .then((res) => {
        console.log(res.data);
        if (res.data === "updated") {
          alert("Bitting Accepted");
        } else {
          alert("Network is down");
        }
      });
  };

  return (
    <div>
      {bitInfo.map((val, ind) => (
        <div className="project-details-container">
          <div className="project-details">
            <h2>{val.student_name}</h2>
            <p>College Name: {val.college_name}</p>
            <p>Bitted Project: {val.project_name}</p>
            <button
              className="edit-button m-1"
              onClick={() => handleClick(val.student_id, val.project_id,val.email)}
            >
              Accept
            </button>
            <button className="edit-button1">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BitConfirm;
