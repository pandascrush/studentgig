import db from "../config/db.js";

const getCourseDetails = async (req, res) => {
  const { id } = req.params;

  let sql = `SELECT course_id, course_name
    FROM course
    WHERE college_id = ${id}`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ msg: "db_error" });
    } else {
      res.json({ result });
    }
  });
};

const getCourseYear = async (req, res) => {
  const { id } = req.params;

  let sql = `SELECT course_id, course_name, years
    FROM course
    WHERE course_id = ${id}`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ msg: "db_error" });
    } else {
      res.json({result});
    }
  });
};

const GetCollegeDetail = async (req, res) => {
  let getcollege = "select * from colleges";
  db.query(getcollege, (error, result) => {
    if (error) {
      // console.log(error)
      res.json({ status: false, msg: "error" });
    } else {
      res.json({ status: true, msg: result });
    }
  });
};

const Skills = async (req, res) => {
  let getSkills = "select * from skills";
  db.query(getSkills, (err, result) => {
    if (err) {
      res.json({ status: false, msg: "error" });
    } else {
      res.json({ status: true, msg: result });
    }
  });
};

export { GetCollegeDetail, Skills, getCourseDetails, getCourseYear };
