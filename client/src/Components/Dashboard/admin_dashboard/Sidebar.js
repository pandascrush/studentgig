import React, { useState } from "react";
import "./Sidebar.css"; // CSS for styling
import arrow from "../../Assets/Vector.png";
import quiz from "../../Assets/Quiz.png";
import setting from "../../Assets/Settings.png";
import people from "../../Assets/People.png";
import assignment from "../../Assets/Assignments.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-light">
      <div className={`sidebar ${isOpen ? "x" : "closed"}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? "X" : "Open"}
        </button>
        <h3 className="px-5">Logo</h3>
        <ul>
          <li>
            <img src={arrow} />
            Reports
          </li>
          <li>
            <img src={assignment} />
            Library
          </li>
          <li>
            <img src={people} />
            People
          </li>
          <li>
            <img src={quiz} />
            Activities
          </li>
          {/* Add more sidebar items */}
        </ul>
        <h3>Support</h3>
        <ul>
          <li>
            <img src={setting} />
            Settings
          </li>
        </ul>
        <div className="user-info">
          <img src={people} />
          <h1>Name</h1>
          <p>email</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
