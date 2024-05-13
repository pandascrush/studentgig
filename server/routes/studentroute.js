import express from 'express'
import { GetSingleStudentData, Logout, StudentLogin, StudentRegistration, Verify, getProfile, getSingleProfile, profileUpdation, updateUserData } from '../controller/studentcontroller.js'
import upload from '../middleware/multer.js'
const studentRouter = express.Router()

studentRouter.route('/registration').post(StudentRegistration)
studentRouter.route('/login').post(StudentLogin)
studentRouter.route('/getdata/:student_id').get(GetSingleStudentData)
studentRouter.post('/upload',upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
]),profileUpdation)
studentRouter.route('/update').put(updateUserData)

// Get Single Profile
studentRouter.route('/getall/:id').get(getSingleProfile)
studentRouter.route('/images/:filename').get(getProfile)

// Authentication
studentRouter.route('/auth').get(Verify)
studentRouter.route('/logout').get(Logout)

export {studentRouter}