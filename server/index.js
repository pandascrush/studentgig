import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
import db from './config/db.js'
import cookieParser from 'cookie-parser'
import { studentRouter } from './routes/studentroute.js'
import { collegeRouter } from './routes/collegeroute.js'
import Verification from './middleware/verification.js'

dotenv.config()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

app.use('/stu',studentRouter)
app.use('/college',collegeRouter)
app.use('/verify',Verification,studentRouter)

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on port no ${process.env.PORT}`)
})