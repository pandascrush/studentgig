import db from "../config/db.js";
import path from "path";
import jwt from "jsonwebtoken";

const StudentRegistration = async (req, res) => {
  let {
    name,
    email,
    password,
    selectedCategory,
    selectedCollege,
    year,
    skill,
  } = req.body;

  let registrationsql =
    "insert into students(name,email,password,degree,year,specialization,college_id,role_id)values(?,?,?,?,?,?,?,1)";
  db.query(
    registrationsql,
    [name, email, password, selectedCollege, year, skill, selectedCategory],
    (error, result) => {
      if (error) {
        console.log("error", error);
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
    } else if (result.length > 0) {
      let dbpassword = result[0].password;
      let id = result[0].student_id;
      let role = result[0].role_id;
      let name = result[0].name;

      if (dbpassword === password) {
        const token = jwt.sign({ user: id }, "secretkey", { expiresIn: "1d" });
        res.cookie("accessToken", token, { httpOnly: true });
        res.json({ status: "user", id: id, role: role, name: name });
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

const profileUpdation = async (req, res) => {
  const { id, git, des, url, skill } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No files were uploaded.");
  }

  // Retrieve file metadata
  const file1Filename = file.originalname;
  const file1Path = file.path;

  try {
    const sqlUpdateStudent = "UPDATE students SET github_link=?, resume_file=? WHERE student_id=?";
    db.query(sqlUpdateStudent, [git, file1Path, id], (err, result) => {
      if (err) {
        console.error("Error updating student in the database: ", err);
        return res.status(500).send("Internal server error");
      }

      const sqlCheckSkill = "SELECT * FROM student_skills WHERE student_id=? AND skill_id=?";
      db.query(sqlCheckSkill, [id, skill], (err, results) => {
        if (err) {
          console.error("Error checking skills in the database: ", err);
          return res.status(500).send("Internal server error");
        }

        if (results.length > 0) {
          // Entry already exists
          return res.status(400).send("Skill_already_exists_for_this_student");
        } else {
          const sqlInsertSkill = "INSERT INTO student_skills(student_id, skill_id, skill_url, skill_description) VALUES (?, ?, ?, ?)";
          db.query(sqlInsertSkill, [id, skill, url, des], (err, result) => {
            if (err) {
              console.error("Error inserting skill into the database: ", err);
              return res.status(500).json({ status: "error" });
            }

            res.status(200).send("Files uploaded successfully");
          });
        }
      });
    });
  } catch (e) {
    res.status(500).json({ msg: "db_error" });
  }
};



const updateUserData = async (req, res) => {
  const { Name, Email, Password, Degree, Year, Spl, coll, id } = req.body;

  const file = req.file;
  console.log(file);

  const Filename = file.filename;
  const Pathname = file.path;

  let sql =
    "update students set name=?,email=?,password=?,degree=?,year=?,specialization=?,college_id=?, profile_photo=? where student_id=?";
  db.query(
    sql,
    [Name, Email, Password, Degree, Year, Spl, coll, Filename, id],
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.json({ status: false, msg: "error" });
      } else {
        res.json({ status: true, msg: "updated" });
      }
    }
  );
};

const getSingleProfile = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  let sql = "select * from students where student_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("error");
    } else {
      var photo = result[0].profile_photo;
      photo = "hiii";
      console.log(photo);

      const __dirname = path.resolve();
      // res.sendFile(path.join(__dirname, photo));
      let img = path.join(__dirname, photo);
      res.send({ result, img });
    }
  });
};

const Verify = async (req, res) => {
  res.json({ status: true, msg: "authorized" });
};

const Logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.json({ status: true, msg: "logout" });
};

export {
  Logout,
  Verify,
  getSingleProfile,
  updateUserData,
  StudentRegistration,
  StudentLogin,
  GetSingleStudentData,
  profileUpdation,
};
