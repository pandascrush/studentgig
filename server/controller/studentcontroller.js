import db from "../config/db.js";

const StudentRegistration = async (req, res) => {
  let { name, email, password, degree, year, specialization, college} =
    req.body;
  let registrationsql =
    "insert into students(name,email,password,degree,year,specialization,college_id, role_id)values(?,?,?,?,?,?,?,1)";
  db.query(
    registrationsql,
    [name, email, password, degree, year, specialization, college],
    (error, result) => {
      if (error) {
        console.log("error");
        res.json({ status: "error" });
      } else {
        res.json({ status: "inserted" });
      }
    }
  );
};

const StudentLogin = async (req, res) => {
  const { email, password } = req.body;

  let loginsql = "select * from students where email=?";
  db.query(loginsql, [email], (error, result) => {
    if (error) {
      res.json({ status: false, msg: err });
    } 
    else if (result.length > 0) {
      let dbpassword = result[0].password;
      let id = result[0].student_id;
      let role = result[0].role_id;

      if (dbpassword === password) {
        res.json({ status: "user", id: id,role:role});
      } else {
        res.json({ msg: "invalid_password" });
      }
    } else {
      res.json({ msg: "not_a_user" });
    }
  });
};

const GetSingleStudentData = async (req, res) => {
  const { student_id } = req.params;

  let getdata = "select * from students where student_id=?";
  db.query(getdata, [student_id], (error, result) => {
    if (error) {
      res.json({ msg: "error", status: false });
    } else {
      res.json({ status: true, msg: result });
    }
  });
};

const profileUpdation = async(req,res)=>{
  const {name,git} = req.body
    
    const files = req.files;

    if (!files) {
        return res.status(400).send('No files were uploaded.');
    }

    // Insert file metadata into the database
    const file1 = files['file1'][0];
    const file2 = files['file2'][0];


    // Retrieve file metadata
    const file1Filename = file1.originalname;
    const file1Path = file1.path;
    const file2Filename = file2.originalname;
    const file2Path = file2.path;

    // Insert file metadata into the database
    const sql = 'INSERT INTO students(`profile_photo`, `github_link`, `resume_file`) VALUES (?, ?, ?)';
    db.query(sql, [file1Filename,git,file2Filename], (err, result) => {
        if (err) {
            console.error('Error inserting files into database: ', err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Files inserted into database');
            res.status(200).send('Files uploaded successfully.');
        }
    });
}

export { StudentRegistration, StudentLogin, GetSingleStudentData, profileUpdation };
