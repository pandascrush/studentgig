import React from "react";
import "./Concept.css";
import empowermentim from "../Assets/Rectangle 19.png";
import integrityim from "../Assets/Rectangle 16.png";
import innovationim from "../Assets/Rectangle 20.png";
import communityim from "../Assets/Rectangle 18.png";

function Concept() {
  return (
    <section id="concept">
      <div className="container">
        <h1 className="headingtext text-center mb-5">WHAT SETS US APART</h1>

        <div className="row no-gutters ">
          <div className="col d-flex box2 rounded-1 part1" id="b1">
            <img src={empowermentim} className="boxim" alt="Loading" />
            <div>
              <h3 className="text-center">Empowerment</h3>
              <p>
                We empower students to take charge of their careers and develop
                their professional identities
              </p>
            </div>
          </div>

          <div className="col d-flex box2 rounded-1 part2">
            <div>
              <h3 className="text-center">Innovation</h3>
              <p>
                We encourage creativity and the out-of-the-box thinking,are
                providing opportunities that challenge and inspire.
              </p>
            </div>
            <img src={innovationim} className="boxim" alt="Loading" />
          </div>
        </div>

        {/* DEMO */}
        <div className="row mb-5">
          <div className="col d-flex box2 rounded-1">
            <img src={integrityim} className="boxim"  alt="Loading"/>
            <div>
              <h3 className="text-center">Integrity</h3>
              <p>
                We are committed to maintaining the highest standards of honesty
                and fairness in all our interactions.
              </p>
            </div>
          </div>

          <div className="col d-flex box2 rounded-1" id="b1">
            <div>
              <h3 className="text-center">Community</h3>
              <p>
                We foster a supportive community where students and our
                professionals can collaborate and grow together.
              </p>
            </div>
            <img src={communityim} className="boxim" alt="Loading" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Concept;
