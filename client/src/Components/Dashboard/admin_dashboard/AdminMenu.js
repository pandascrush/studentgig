import React from "react";
// import "./Studentmenu.css";
// import { Bussinessdashboardmain } from '../main/main';
import { Link, useParams } from "react-router-dom";
import logo from "../../Assets/KGGL.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminMenu() {
  var { id } = useParams();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:5000/stu/logout").then((res) => {
      if (res.data.status) {
        navigate("/");
      }
    });
  };
  return (
    <>
      <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <nav
          class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
          id="navbarVertical"
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler ms-n2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarCollapse"
              aria-controls="sidebarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <a class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
              <h3 style={{ color: "#DC3545" }}></h3>
              <img src={logo} className="col-lg-8 h-75" />
            </a>
            {/* <!-- User menu (mobile) --> */}
            <div class="navbar-user d-lg-none">
              {/* <!-- Dropdown --> */}
              <div class="dropdown">
                {/* <!-- Toggle --> */}
                <a
                  href="#"
                  id="sidebarAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div class="avatar-parent-child">
                    <img
                      alt="Pic Placeholder"
                      src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                      class="avatar avatar- rounded-circle"
                    />
                    <span class="avatar-child avatar-badge bg-success"></span>
                  </div>
                </a>
              </div>
            </div>
            {/* <!-- Collapse --> */}
            <div class="collapse navbar-collapse" id="sidebarCollapse">
              {/* <!-- Navigation --> */}
              <ul class="navbar-nav">
                <Link to={`/dash/${id}`}>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <i class="bi bi-house"></i> Dashboard
                    </a>
                  </li>
                </Link>
                <li class="nav-item">
                  <Link to={`/studata/${id}`}>
                    <a class="nav-link" href="#">
                      <i class="bi bi-people"></i> Students
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={`/addproject/${id}`}>
                    <a class="nav-link" href="#">
                      <i class="bi bi-people"></i> Add Project
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={`/getprojects/${id}`}>
                    <a class="nav-link" href="#">
                      <i class="bi bi-people"></i> Projects
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={`/quiz/${id}`}>
                    <a class="nav-link" href="#">
                      <i class="bi bi-people"></i> Add New Quizzes
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={`/assignquiz/${id}`}>
                    <a class="nav-link" href="#">
                      <i class="bi bi-people"></i> Quizz Assigning
                    </a>
                  </Link>
                </li>
              </ul>

              <hr class="navbar-divider my-5 opacity-20" />

              <ul class="navbar-nav">
                <li class="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger mx-5"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
