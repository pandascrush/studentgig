import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BitConfirm() {
  const { id } = useParams();

  const [bitInfo,setBitInfo] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:5000/admin/bittedDetail/${id}`)
    .then(res =>{
        console.log(res.data)
        setBitInfo(res.data)
    })
  },[id])

  return(
    <div>
        {bitInfo.map((val, ind) => (
        <div className="project-details-container">
          <div className="project-details">
            <h2>{val.student_name}</h2>
            <p>College Name: {val.college_name}</p>
            <p>Bitted Project: {val.project_name}</p>
            <button
              className="edit-button m-1"
            >
                Accept
            </button>
            <button
              className="edit-button1"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  )

}

export default BitConfirm;
