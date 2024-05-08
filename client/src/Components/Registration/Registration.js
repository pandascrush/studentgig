import React, { useState, useEffect } from "react";
import img from "../Assets/Group 289210.png"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function Registration() {
  // State for form fields
  const [college, setCollege] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/college/getcollege")
      .then((res) => res.json())
      .then((data) => {
        setCollege(data.msg)
  });
  },[]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    degree: "",
    year: "",
    specialization: "",
    college: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send form data to server
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      degree: "",
      year: "",
      specialization: "",
      college: "",
    });

    axios.post("http://localhost:5000/stu/registration", formData).then((res) => {
      if (res.data.status === "inserted") {
        alert("data are Registed successfully");
        window.location.href = "/";
      } else if (res.data.status === "error") {
        alert("Already register...");
      } else {
        alert("data are not Registed");
      }
    });
  };

  return (
    <>
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
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Email:</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Password:</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Degree:</label>
                    <input
                      type="text"
                      class="form-control"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Year:</label>
                    <input
                      type="text"
                      class="form-control"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Specialization:</label>
                    <input
                      type="text"
                      class="form-control"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">College:</label>
                    <select
                      name="college"
                      class="form-control"
                      value={formData.college}
                      onChange={handleInputChange}
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

            <p className="pt-4 text-center">
              Didn't have a Account ?{" "}
              <Link
                to="/"
                style={{ color: "#DC3545", textDecoration: "none" }}
              >
                <span style={{ color: "#DC3545", textDecoration: "none" }}>
                  Sign In
                </span>
              </Link>
            </p>
          </div>
          <div className="col-lg-1 p-5 d-none d-lg-block">
            <Link to="/">
              <FontAwesomeIcon icon={faXmark} className="iconsize" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
