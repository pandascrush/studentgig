import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StuentProject() {
  const { id } = useParams();

  const [project,setProject] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:5000/admin/basproject/${id}`)
    .then(res => {
        console.log(res)
        setProject(res.data.result)
    })
  },[])

  return(
    <div>
        {
            project.map((e,i)=>{
                return(
                    <div className="card m-2 p-3">
                        <h1>{i+1}. {e.project_name}</h1>
                        <p>{e.description}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default StuentProject;
