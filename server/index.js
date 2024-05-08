import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
import db from './config/db.js'
import { studentRouter } from './routes/studentroute.js'
import { collegeRouter } from './routes/collegeroute.js'

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/stu',studentRouter)
app.use('/college',collegeRouter)


app.listen(process.env.PORT,()=>{
    console.log(`The server is running on port no ${process.env.PORT}`)
})