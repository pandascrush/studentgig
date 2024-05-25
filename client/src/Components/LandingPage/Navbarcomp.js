import React from 'react'
import Logoim from '../Assets/293 x 267-01 1.png';
import "./Navbar.css";
import { Link } from 'react-router-dom';

const AppBar = () => {
    return (
        <>
    <nav class="navbar navbar-expand-lg navcontent sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand ps-2" href="#"><img src={Logoim} className='logim'/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="fw-bold text-light nav-link " aria-current="page" href="#landing">Home</a>
        </li>
        <li class="nav-item">
          <a class="fw-bold text-light nav-link " href="#procedure">ABOUT</a>
        </li>
        <li class="nav-item">
          <a class="fw-bold text-light nav-link " href="#our">
            STORY
          </a>
        </li>
        <li class="nav-item">
          <a class="fw-bold text-light nav-link " href="#concept">
            EVOLUTION
          </a>
        </li>
        <li class="nav-item fw-bold text-light">
          <a class="fw-bold text-light nav-link " href="#community">
            COMMUNITY
          </a>
        </li>
      </ul>
      <Link to={'/login'} className='btn btn-light rounded-1'>Login</Link>
    </div>
  </div>
</nav> 
        </>
    )
}

export default AppBar;