import React from "react";
import "./Studentmenu.css";
// import { Bussinessdashboardmain } from '../main/main';
import { Link, useParams } from "react-router-dom";
import logo from "../../Assets/KGGL.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextUser } from "./Context/context";

export function StudentMenu() {
  var { id } = useParams();
  const decoded = atob(id)
  const navigate = useNavigate();

  axios.defaults.withCredentials=true
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
              <img src={logo} className="col-lg-8 h-100" />
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
                {/* <!-- Menu --> */}
                {/* <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                            <a href="#" class="dropdown-item">Profile</a>
                            <a href="#" class="dropdown-item">Settings</a>
                            <a href="#" class="dropdown-item">Billing</a>
                            <hr class="dropdown-divider"/>
                            <a href="#" class="dropdown-item">Logout</a>
                        </div> */}
              </div>
            </div>
            {/* <!-- Collapse --> */}
            <div class="collapse navbar-collapse" id="sidebarCollapse">
              {/* <!-- Navigation --> */}
              <ul class="navbar-nav">
                <Link to={`/student/${id}`}>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <i class="bi bi-house"></i> Dashboard
                    </a>
                  </li>
                </Link>
                <li class="nav-item">
                  <Link to={`/profile/${id}`}>
                    <a class="nav-link" href="#">
                      <i class="bi bi-people"></i> Profile
                    </a>
                  </Link>
                </li>
                {/* <Link to={`/message/${id}`}><li class="nav-item">
                            <a class="nav-link">
                                <i class="bi bi-bar-chart"></i> Messages
                            </a>
                        </li></Link> */}
                {/* <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-chat"></i> Messages
                                <span class="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>
                            </a>
                        </li> */}
                {/* <li class="nav-item">
                            <Link to={`/bussinessplan/${id}`}>
                            <a class="nav-link" href="#">
                                <i class="bi bi-bookmarks"></i> purchase License
                            </a>
                            </Link>
                        </li> */}
                {/* <li class="nav-item">
                        <Link to=''>
                            <a class="nav-link" href="#">
                                <i class="bi bi-people"></i> Users
                            </a>
                            </Link>
                        </li> */}
              </ul>

              <hr class="navbar-divider my-5 opacity-20" />

              <ul class="navbar-nav">
                <li class="nav-item">
                  {/* <Link to='/'>
                            <a class="nav-link" href="#">
                                <i class="bi bi-box-arrow-left"></i> Logout
                            </a>
                            </Link> */}
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
