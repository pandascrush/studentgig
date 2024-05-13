import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Registration } from "./Components/Registration/Registration";
import { Studentdashboard, Studentprofile } from "./Components/Dashboard/student_dashboard/Studentdashboard";
import MaybeShowNavBar from "./MayBeShowTheNavBar/MayBeShowTheNavBar";
// import { Profile } from "./Components/Dashboard/student_dashboard/Profile";
import ProfileUpdate from "./Components/Dashboard/student_dashboard/ProfileUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/reg" Component={Registration} />
          <Route path="/student/:id" Component={Studentdashboard} />
          <Route path="/profile/:id" Component={Studentprofile} />
          <Route path="/update/:id" Component={ProfileUpdate} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
