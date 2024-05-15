import express from "express";
import {
  filterCollegeStduents,
  filterStudentSkills,
  studentsCount,
  studentsData,
} from "../controller/admincontroller.js";
const adminRouter = express.Router();

adminRouter.route("/college").get(filterCollegeStduents);
adminRouter.route("/skill").get(filterStudentSkills);
adminRouter.route("/stucount").get(studentsCount);
adminRouter.route('/studata').get(studentsData)

export default adminRouter;
