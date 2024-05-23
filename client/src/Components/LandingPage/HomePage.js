import React from "react";
import AppBar from "./Navbarcomp";
import Landingpage from "./Banner";
import Procedure from "./Procedure";
import Concept from "./Concept";
import Footer from "./Footer";
import Ourstory from "./Outstory";

function HomePage() {
  return (
    <div>
      <AppBar />
      <Landingpage />
      <Procedure />
      <Ourstory />
      <Concept />
      <Footer />
    </div>
  );
}

export default HomePage;
