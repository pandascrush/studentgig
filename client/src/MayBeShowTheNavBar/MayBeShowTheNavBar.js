import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MaybeShowNavBar({ children }) {
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // console.log("This location is:" , location);
    if (location.pathname === "/" || location.pathname === "/reg") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div>{showNavbar && children}</div>;
}

export default MaybeShowNavBar;
