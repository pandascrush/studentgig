import React from "react";
import { StudentMenu } from "./StudentMenu";
import Profile from "./Profile1";
import Barchart from "../admin_dashboard/Barchart";
import Kgcas from "../admin_dashboard/Progress";
import StudentProject from "./StuentProject";

export function Studentdashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <StudentMenu />
          </div>
          <div className="col-lg-10">
            <StudentProject />
          </div>
        </div>
      </div>
    </>
  );
}

export function Studentprofile() {
  return (
    <>
      <div className="container-fluid sideback">
        <div className="row sideback">
          <div className="col-lg-2 sideback">
            <StudentMenu />
          </div>
          <div className="col-lg-10 background sideback">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}
