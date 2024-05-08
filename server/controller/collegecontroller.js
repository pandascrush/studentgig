import db from "../config/db.js";

const GetCollegeDetail = async(req,res)=>{
    let getcollege='select * from colleges'
    db.query(getcollege,(error,result)=>{
        if(error){
            // console.log(error)
            res.json({status:false,msg:"error"})
        }
        else{
            res.json({status:true,msg:result})
        }
    })
}

export {GetCollegeDetail}