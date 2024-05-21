import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
    const {token} = useParams()
    const [Password,setPassword] = useState()
    const nav = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()

        axios.post(`http://localhost:5000/stu/reset/${token}`,{Password})
        .then(res => {
            // console.log(res);
            if(res.data === "password_updated"){
                alert("Password Updated Successfully")
                nav('/')
            }
        })
    }

  return (
    <div className="text-start d-flex justify-content-center">
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <div class="mb-3">
        <label className="form-label">
          New Password
        </label>
        <input
          style={{ width: "300px" }}
          type="password"
          className="form-control"
          id="password"
          aria-describedby="emailHelp"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
  )
}

export default ResetPassword