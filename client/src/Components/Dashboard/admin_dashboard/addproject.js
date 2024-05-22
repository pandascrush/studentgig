import axios from "axios";
import React, { useEffect, useState } from "react";

export function Addproject() {
  const [pname, setPname] = useState("");
  const [pdes, setPdes] = useState("");
  const [skill, setSkill] = useState("");
  const [date, setDate] = useState();

  const [college, setCollege] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/college/skill").then((res) => {
      console.log(res.data.msg);
      setCollege(res.data.msg);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/admin/addproject`, { pname, pdes, skill,date })
      .then((res) => {
        if (res.data.msg === "added") {
          alert("Project Added");
        } else {
          alert("Network is down");
        }
      });
  };

  return (
    <div className="d-flex justify-content-center g-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2>Add Projects</h2>
          <label for="exampleInputEmail1" className="form-label">
            Project Name
          </label>
          <input
            style={{ width: "300px" }}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setPname(e.target.value)}
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px", width: "300px" }}
            onChange={(e) => setPdes(e.target.value)}
          ></textarea>
          <label for="floatingTextarea2">Comments</label>
        </div>
        <div className="form-group">
          <label className="form-control-label">stack</label>
          <select
            name="college"
            className="form-control"
            style={{ width: "300px" }}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="">Select Stack</option>
            {college.map((value, index) => (
              <option value={value.skill_id}>{value.skill_name}</option>
            ))}
            <option>Add New</option>
          </select>
        </div>
        <div>
          <label>Choose Expiry Date</label>
          <br />
          <input onChange={e=>setDate(e.target.value)} type="datetime-local" className="border border-radius-5" />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
