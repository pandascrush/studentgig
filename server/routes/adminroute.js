import express from "express";
import {
  addProjects,
  bittedInfo,
  filterCollegeStduents,
  filterStudentSkills,
  getAllProjects,
  getBitInfo,
  skillBasedProjects,
  studentBitInfo,
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
adminRouter.route('/bitinfo').post(studentBitInfo)
adminRouter.route('/getallprojects').get(getAllProjects)
adminRouter.route('/getbit').get(getBitInfo)
adminRouter.route('/bittedDetail/:id').get(bittedInfo)

export default adminRouter;
