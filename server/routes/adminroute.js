import express from "express";
import {
  acceptBitting,
  addProjects,
  addQuestion,
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
import { body } from 'express-validator'
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

adminRouter.route('/accept/:stuid/:proid').post(acceptBitting)

adminRouter.post('/add-question',
[
  body('question_text').isString().notEmpty(),
  body('correct_answer').isString().notEmpty(),
  body('options').isArray().notEmpty(),
  body('difficulty_level_id').isInt({ min: 1, max: 3 }),
  body('category_id').optional().isInt(),
],addQuestion)

export default adminRouter;
