import express from 'express'
import { ForgotPassword, GetSingleStudentData, Logout, ResetPassword, StudentLogin, StudentRegistration, Verify, getSingleProfile, getStudentSkills, profileUpdation, updateUserData } from '../controller/studentcontroller.js'
import upload from '../middleware/multer.js'
const studentRouter = express.Router()

studentRouter.route('/registration').post(StudentRegistration)
studentRouter.route('/login').post(StudentLogin)
studentRouter.route('/getdata/:student_id').get(GetSingleStudentData)
studentRouter.post('/upload',upload.single('file2'),profileUpdation)
studentRouter.put('/update',upload.single('file'),updateUserData)

// Forgot Password
studentRouter.route('/forgot').post(ForgotPassword)
studentRouter.route('/reset/:token').post(ResetPassword)

// get Student Skill
studentRouter.route('/getSkill/:id').get(getStudentSkills)

// Get Single Profile
studentRouter.route('/getall/:id').get(getSingleProfile)

// Authentication
studentRouter.route('/auth').get(Verify)
studentRouter.route('/logout').get(Logout)

export {studentRouter}



// Accessing multiple files in single page
// studentRouter.post('/upload',upload.fileds([
//     { name: 'file1', maxCount: 1 },
//     { name: 'file2', maxCount: 1 },
// ]),profileUpdation)