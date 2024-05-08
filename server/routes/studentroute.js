import express from 'express'
import { GetSingleStudentData, StudentLogin, StudentRegistration, profileUpdation } from '../controller/studentcontroller.js'
import upload from '../middleware/multer.js'
const studentRouter = express.Router()

studentRouter.route('/registration').post(StudentRegistration)
studentRouter.route('/login').post(StudentLogin)
studentRouter.route('/getdata/:student_id').get(GetSingleStudentData)
studentRouter.post('/upload',upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
]),profileUpdation)

export {studentRouter}