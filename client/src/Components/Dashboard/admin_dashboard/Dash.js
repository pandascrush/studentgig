import React from "react";
import Kgcas from "./Progress";
import { AdminMenu } from "./AdminMenu";
import MainContent from "./MainContent";
import StudentsData from "./StudentsData";
import { Addproject } from "./addproject";
import Projects from "./Projects";
import BitConfirm from "./BitConfirm";
import DoughnutPieChart from "./Barchart";
import styles from "./Dash.module.css";
import AddQuestion from "./AddQuestion";
import QuizzAssign from "./QuizzAssign";

function Dash() {
  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row align-items-center justify-content-center h-100">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-5">
            <div className={styles.chartContainer}>
              <h1>College</h1>
              <DoughnutPieChart />
            </div>
          </div>
          <div className="col-lg-5">
            <div className={styles.chartContainer}>
              <h1>Skill</h1>
              <Kgcas />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Dashprofile() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <AdminMenu />
        </div>
        <div className="col-lg-10">
          <MainContent />
        </div>
      </div>
    </div>
  );
}
export function Dashstudent() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <AdminMenu />
        </div>
        <div className="col-lg-10">
          <StudentsData />
        </div>
      </div>
    </div>
  );
}
export function Dashproject() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            <Addproject />
          </div>
        </div>
      </div>
    </>
  );
}

export function DashAllProjects() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            <Projects />
          </div>
        </div>
      </div>
    </>
  );
}

export function DashBit() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            <BitConfirm />
          </div>
        </div>
      </div>
    </>
  );
}

export function AddQuizzes() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <AdminMenu />
          </div>
          <div className="col-lg-10">
            <AddQuestion />
          </div>
        </div>
      </div>
    </>
  );
}

export function AssigningQuizz() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <AdminMenu />
        </div>
        <div className="col-lg-10">
          <QuizzAssign />
        </div>
      </div>
    </div>
  );
}

export default Dash;
