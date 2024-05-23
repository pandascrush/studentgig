import React from 'react';
import "./Procedure.css";
import img1 from "../Assets/Mask group.png";
import img2 from "../Assets/Rectangle 37.png";
import img3 from "../Assets/Rectangle 38.png";
import img4 from "../Assets/imagegirl.png";
import img5 from "../Assets/Rectangle 40.png";
import img6 from "../Assets/Rectangle 39.png";

function Procedure() {
  return (
    <section id='procedure'>
      <div id='smd'>
       <div className='d-flex flex-wrap justify-content-center '>
          <div className='m-2  position-relative'>
            <img src={img1} className='carim img-fluid' alt="Sign Up" id='procedureim'/>
            <div className="overlay">
              <h3>Sign Up</h3>
              <p>Build a profile, update projects, and upload your resume</p>
            </div>
          </div>
          <div className='m-2 position-relative'>
            <img src={img2} className='carim img-fluid' alt="Testing Phase" id='procedureim' />
            <div className="overlay">
              <h3>Testing Phase</h3>
              <p>Pass skill tests to join projects</p>
            </div>
          </div>
          <div className='m-2 position-relative'>
            <img src={img3} className='carim img-fluid' alt="Browse Gigs" id='procedureim'/>
            <div className="overlay">
              <h3>Browse Gigs</h3>
              <p>Find your skill-based project</p>
            </div>
          </div>
          <div className='m-2 position-relative'>
            <img src={img6} className='carim img-fluid' alt="Apply & Collaborate" id='procedureim'/>
            <div className="overlay">
              <h3>Apply & Collaborate</h3>
              <p>Bid for projects and collaborate with our professionals</p>
            </div>
          </div>
          <div className='m-2 position-relative'>
            <img src={img5} className='carim img-fluid' alt="Get Paid & Certified" id='procedureim'/>
            <div className="overlay">
              <h4>Get Paid & Certified</h4>
              <p>Get paid and receive certification from KGGeniusLabs</p>
            </div>
          </div>
        </div>
      </div>
      <div id='lgd' >
        <div className='d-flex justify-content-center'>
        <div className='im'>
       </div>
        </div>
      </div>
    </section>
  );
}
export default Procedure;
