import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Registration } from "./Components/Registration/Registration";
import {
  Studentdashboard,
  Studentprofile,
  StudentprojectDeatil,
} from "./Components/Dashboard/student_dashboard/Studentdashboard";
import ProfileUpdate from "./Components/Dashboard/student_dashboard/ProfileUpdate";
import Dash, {DashAllProjects, DashBit, Dashprofile, Dashproject, Dashstudent } from "./Components/Dashboard/admin_dashboard/Dash";
import ForgotPassword from "./Components/Dashboard/Password/ForgotPassword";
import ResetPassword from "./Components/Dashboard/Password/ResetPassword";
import ProjectDeatails from "./Components/Dashboard/student_dashboard/ProjectDeatails";

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
          <Route path="/detail/:id/:proid" Component={StudentprojectDeatil}/>
          <Route path="/bit/:id" Component={DashBit} />
          {/*Admin Routes */}
          <Route path="/manager/:id" Component={Dash} />
          <Route path="/dash/:id" Component={Dashprofile} />
          <Route path="/studata/:id" Component={Dashstudent}/>
          <Route path="/addproject/:id" Component={Dashproject}/>
          <Route path="/getprojects/:id" Component={DashAllProjects} />

          {/*Forgot Password*/}
          <Route path="/forgot" Component={ForgotPassword} />
          <Route path="/reset/:token" Component={ResetPassword} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
