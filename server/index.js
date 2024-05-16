import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import db from './config/db.js'
const app = express()
import cookieParser from 'cookie-parser'
import { studentRouter } from './routes/studentroute.js'
import { collegeRouter } from './routes/collegeroute.js'
import Verification from './middleware/verification.js'
import adminRouter from './routes/adminroute.js'

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
app.use('/admin',adminRouter)


// 
app.get('/',(req,res)=>{
    res.send("Hello World...")
})

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on port no ${process.env.PORT}`)
})