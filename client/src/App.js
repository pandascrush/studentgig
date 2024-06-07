import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Registration } from "./Components/Registration/Registration";
import {
  StudentQuizz,
  Studentdashboard,
  Studentprofile,
  StudentprojectDeatil,
} from "./Components/Dashboard/student_dashboard/Studentdashboard";
import ProfileUpdate from "./Components/Dashboard/student_dashboard/ProfileUpdate";
import Dash, {AddQuizzes, AssigningQuizz, DashAllProjects, DashBit, Dashprofile, Dashproject, Dashstudent } from "./Components/Dashboard/admin_dashboard/Dash";
import ForgotPassword from "./Components/Dashboard/Password/ForgotPassword";
import ResetPassword from "./Components/Dashboard/Password/ResetPassword";
import HomePage from "./Components/LandingPage/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={Login} />
          <Route path="/reg" Component={Registration} />
          <Route path="/student/:id/:name" Component={StudentQuizz} />
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
          <Route path='/quiz/:id' Component={AddQuizzes} />
          <Route path="/assignquiz/:id" Component={AssigningQuizz}/>
          {/*Forgot Password*/}
          <Route path="/forgot" Component={ForgotPassword} />
          <Route path="/reset/:token" Component={ResetPassword} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
