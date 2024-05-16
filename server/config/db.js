import mysql from 'mysql'

const db = mysql.createConnection({
    host: "barpuxnjgberfpv0rrot-mysql.services.clever-cloud.com",
    port: 3306,
    user: "uvtharvgdtjssdho",
    password:"JkWY5xPiuH5TdGl2acui",
    database:"barpuxnjgberfpv0rrot"
})

db.connect((err,res)=>{
    if(err) console.log("db error", err)
    else console.log("Db connected")   
})

export default db