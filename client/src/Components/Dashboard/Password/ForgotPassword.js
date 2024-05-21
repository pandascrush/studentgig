import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [Email, setEmail] = useState();
  const nav = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/stu/forgot", { Email }).then((res) => {
      //   console.log(res);
      if (res.data === "mail_sended") {
        alert("Check You're mail");
        nav("/");
      }
    });
  };

  return (
    <div className="text-start d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div class="mb-3">
          <label className="form-label">Email address</label>
          <input
            style={{ width: "300px" }}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
