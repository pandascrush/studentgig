import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../../Assets/Group 289210.png";
import axios from "axios";

function ProfileUpdate() {
  const { id } = useParams();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Degree, setDegree] = useState("");
  const [Year, setYear] = useState("");
  const [Spl, setSpl] = useState("");
  const [coll, setColl] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/stu/getdata/${id}`).then((res) => {
      // console.log(res.data.msg[0].name)
      let result = res.data.msg[0]
      setName(result.name);
      setEmail(result.email)
      setPassword(result.password)
      setDegree(result.degree)
      setYear(result.year)
      setSpl(result.specialization)
      setColl(result.college_id)
    });
  }, []);

  const [college, setCollege] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/college/getcollege")
      .then((res) => res.json())
      .then((data) => {
        setCollege(data.msg);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    axios.put('http://localhost:5000/stu/update',{Name,Email,Password,Degree,Year,Spl,coll,id})
    .then(res => console.log(res))
  }

  return (
    <div className="container-fluid paddingleft">
      <div className="row">
        <div className="col-lg-5 paddingleft">
          <img src={img} className="container-fluid" alt="Loading" />
        </div>
        <div className="col-lg-6 p-5 mt-4">
          <div class="col-lg-12 login-title">
            <h3>Sign Up</h3>
            <h5 style={{ color: "#802626" }}></h5>
          </div>

          <div class="col-lg-12 login-form ">
            <div class="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label class="form-control-label">Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Email:</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Degree:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="degree"
                    value={Degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Year:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="year"
                    value={Year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Specialization:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="specialization"
                    value={Spl}
                    onChange={(e) => setSpl(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">College:</label>
                  <select
                    name="college"
                    class="form-control"
                    value={coll}
                    onChange={(e) => setColl(e.target.value)}
                  >
                    <option value="">Select College</option>
                    {college.map((value, index) => (
                      <option value={value.college_id}>
                        {value.college_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-success mt-3 col-lg-12"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div class="col-lg-3 col-md-2"></div>
        </div>
        <div className="col-lg-1 p-5 d-none d-lg-block">
          <Link to="/">
            <FontAwesomeIcon icon={faXmark} className="iconsize" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
