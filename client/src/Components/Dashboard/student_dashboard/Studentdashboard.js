import React from "react";
import { StudentMenu } from "./StudentMenu";
import Profile from "./Profile1";
import Barchart from "../admin_dashboard/Barchart";
import Kgcas from "../admin_dashboard/Progress";

export function Studentdashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <StudentMenu />
          </div>
          <div className="col-lg-10">
            <div className="row">
              <Barchart/>
              <Kgcas/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Studentprofile() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <StudentMenu />
          </div>
          <div className="col-lg-10">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}
