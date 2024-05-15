// import React from 'react';
// import './MainContent.css'; // CSS for styling

// const MainContent = ({ toggleSidebar }) => {
//   return (
//     <div className="main-content">
//       <button className="toggle-sidebar-button" onClick={toggleSidebar}>
//         Open Sidebar
//       </button>
//       {/* Display main content here */}
//       <h1>Welcome to your Dashboard!</h1>
//     </div>
//   );
// }

// export default MainContent;

import React, { useEffect, useState } from "react";
import "./Maincontent.css"; // CSS for styling
import { Bar, Pie } from "react-chartjs-2";
import BarChart from "./Barchart";
import Kgcas from "./Progress";
import axios from "axios";

const MainContent = ({ toggleSidebar }) => {
  const [student, setStudent] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/admin/stucount").then((res) => {
      // console.log(res.data)
      setStudent(res.data.result[0].total_students);
    });
  }, []);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div className="main-content">
      {/* <button className="toggle-sidebar-button" onClick={handleToggleSidebar}>
        Open Sidebar
      </button>
       */}
      {/* Display main content here */}
      {/* <h1 className="highlight">Reports</h1> */}
      <div className="">
        <div>
          <h3>Skill Based</h3>
          <BarChart />
        </div>
        <div>
          <h3>College Based</h3>
          <Kgcas />
        </div>
      </div>
      <hr />
      {/* ////maincontent */}
      {/* <div className="container-fluid">
        <div className="row m-5">
          <div className=" col-sm-12 col-lg-6">
            <div className="card wholecard rounded-5 p-4 m-5">
              <h3 className="text-center">Number of Students</h3>
              <hr />
              <div className="d-flex justify-content-around">
                <div>
                  <p>Last 7 days</p>
                  <p>This Month</p>
                  <p>This Year</p>
                  <p>Total</p>
                </div>
                <div>
                  <p>74</p>
                  <p>234</p>
                  <p>768</p>
                  <p>{student}</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-sm-12 col-lg-6">
            <div className="card border border-3 m-5 rounded-5">
              <div className="d-flex justify-content-between">
                <p className="p-3">Activity</p>
                <select>
                  <option></option>
                </select>
              </div>

              <hr />
              <BarChart />
            </div>
          </div>
          <div className="row">
            <div className="card  col-sm-12 col-lg-4">
              <Kgcas />
            </div>
            <div className="card  col-sm-12 col-lg-4 ">
              <Kgcas />
            </div>
            <div className="card col-sm-12 col-lg-4 ">
              <Kgcas />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainContent;
