import mysql from 'mysql'

const db = mysql.createPool({
    host: "sql.freedb.tech",
    port: 3306,
    user: "freedb_studentdb",
    password:"5AR4*FNVRhGM&K?",
    database:"freedb_studentgig"
})

db.getConnection((err,res)=>{
    if(err) console.log("db error", err)
    else console.log("Db connected")   
})

export default db