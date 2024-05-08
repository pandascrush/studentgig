import express from 'express'
import { GetCollegeDetail } from '../controller/collegecontroller.js'
const collegeRouter = express.Router()

collegeRouter.route('/getcollege').get(GetCollegeDetail)

export {collegeRouter}