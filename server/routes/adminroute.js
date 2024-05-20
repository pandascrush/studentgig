import express from "express";
import {
  addProjects,
  filterCollegeStduents,
  filterStudentSkills,
  skillBasedProjects,
  studentsCount,
  studentsData,
} from "../controller/admincontroller.js";
const adminRouter = express.Router();

adminRouter.route("/college").get(filterCollegeStduents);
adminRouter.route("/skill").get(filterStudentSkills);
adminRouter.route("/stucount").get(studentsCount);
adminRouter.route('/studata').get(studentsData)
adminRouter.route('/addproject').post(addProjects)
adminRouter.route('/basproject/:id').get(skillBasedProjects)

export default adminRouter;
