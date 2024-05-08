import React from "react";
import { StudentMenu } from "./StudentMenu";
import { Profile } from "./Profile";

export function Studentdashboard() {
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
