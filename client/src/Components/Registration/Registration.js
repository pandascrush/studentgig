import React, { useState, useEffect } from "react";
import img from "../Assets/Group 289210.png";
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
        setCollege(data.msg);
      });
  }, []);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [degree, setDegree] = useState();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can handle form submission, e.g., send form data to server
    // Reset form fields after submission

    // axios.post("http://localhost:5000/stu/registration",{name,email,password,degree,selectedCategory}).then((res) => {
    //   if (res.data.status === "inserted") {
    //     alert("data are Registed successfully");
    //     window.location.href = "/";
    //   } else if (res.data.status === "error") {
    //     alert("Already register...");
    //   } else {
    //     alert("data are not Registed");
    //   }
    // });
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      // Fetch colleges based on the selected category
      // fetch(`https://api.example.com/colleges?category=${selectedCategory}`)
      //   .then((response) => response.json())
      //   .then((data) => setColleges(data))
      //   .catch((error) => console.error("Error fetching colleges:", error));
      axios
        .get(`http://localhost:5000/college/course/${selectedCategory}`)
        .then((res) => {
          setColleges(res.data.result);
        });
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedCollege(""); // Reset the selected college when category changes
    setCourses([]); // Reset the courses when category changes
  };

  const handleCollegeChange = (event) => {
    const collegeId = event.target.value;
    console.log(collegeId);
    setSelectedCollege(collegeId);

    // Fetch courses for the selected college
    fetch(`http://localhost:5000/college/years/${collegeId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.result[0].years)
        
        setCourses(data.result[0].years);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const options = [...Array(courses).keys()].map((i) => i + 1);
  console.log(options);
  

  return (
    <>
      <div className="container-fluid paddingleft">
        <div className="row">
          <div className="col-lg-5 paddingleft">
            <img src={img} className="container-fluid" alt="Loading" />
          </div>
          <div className="col-lg-6 p-5 mt-4">
            <div className="col-lg-12 login-title">
              <h3>Sign Up</h3>
              <h5 style={{ color: "#802626" }}></h5>
            </div>

            <div className="col-lg-12 login-form ">
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Degree:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="degree"
                      onChange={(e) => setDegree(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">College:</label>
                    <select
                      name="college"
                      className="form-control"
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select College</option>
                      {college.map((value, index) => (
                        <option value={value.college_id}>
                          {value.college_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Select Course</label>
                    <select
                      className="form-control"
                      value={selectedCollege}
                      onChange={handleCollegeChange}
                      disabled={!selectedCategory}
                    >
                      <option value="">--Course--</option>
                      {colleges.map((college) => (
                        <option
                          key={college.college_id}
                          value={college.course_id}
                        >
                          {college.course_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Year</label>
                    <select
                      className="form-control"
                      disabled={!selectedCollege}
                    >
                      <option value="">--year--</option>
                      {/* <option>{courses}</option> */}
                      {options.map((course) => (
                        <option>
                          {course} Year
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
              Already have a Account ?{" "}
              <Link to="/" style={{ color: "#DC3545", textDecoration: "none" }}>
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
