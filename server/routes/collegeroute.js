import express from 'express'
import { GetCollegeDetail, Skills } from '../controller/collegecontroller.js'
const collegeRouter = express.Router()

collegeRouter.route('/getcollege').get(GetCollegeDetail)
collegeRouter.route('/skill').get(Skills)

export {collegeRouter}