import React from "react";
import Sidebar from "./Sidebar";
import Barchart from "./Barchart";
import Kgcas from "./Progress";
import { AdminMenu } from "./AdminMenu";
import MainContent from "./MainContent";
import { useParams } from "react-router-dom";
import StudentsData from "./StudentsData";

function Dash() {
    
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            {/* <MainContent/> */}
            <Barchart/>
            <Kgcas/>
          </div>
        </div>
      </div>
    </>
  );
}

export function Dashprofile() {
    return(
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-2">
        <AdminMenu />
      </div>
      <div className="col-lg-10">
        <MainContent />
      </div>
    </div>
  </div>)
}
export function Dashstudent(){
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            <StudentsData/>
          </div>
        </div>
      </div>
    );
}
export function Addproject(){
  return(
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            <Addproject/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dash;
