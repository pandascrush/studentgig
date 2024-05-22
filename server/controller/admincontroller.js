import db from "../config/db.js";

const studentsData = async (req, res) => {
  try {
    const sql = `select * from students where role_id=1`;

    db.query(sql, (err, result) => {
      if (err) {
        res.json({ msg: "db_error" });
      } else {
        res.json({ result });
      }
    });
  } catch (err) {
    res.json({ msg: "error" });
  }
};

const studentsCount = async (req, res) => {
  try {
    const sql = `SELECT COUNT(*) AS total_students FROM students`;

    db.query(sql, (err, result) => {
      if (err) {
        res.json({ msg: "db_error" });
      } else {
        res.json({ result });
      }
    });
  } catch (err) {
    res.json({ msg: "error" });
  }
};

const filterCollegeStduents = (req, res) => {
  try {
    const sql = `SELECT c.college_name, COUNT(s.student_id) AS num_students
    FROM students s
    JOIN colleges c ON s.college_id = c.college_id
    GROUP BY c.college_name`;

    db.query(sql, (err, result) => {
      if (err) {
        res.json({ status: false, msg: "db_error" });
      } else {
        res.json({ status: true, msg: result });
      }
    });
  } catch (err) {
    res.json({ msg: "error" });
  }
};

const filterStudentSkills = async (req, res) => {
  try {
    const sql = `SELECT s.skill_name, COUNT(ss.student_id) AS num_students_with_skill
  FROM student_skills ss
  JOIN skills s ON ss.skill_id = s.skill_id
  GROUP BY s.skill_name`;

    db.query(sql, (err, result) => {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ result });
      }
    });
  } catch (e) {
    res.json({ msg: "db_error" });
  }
};

const addProjects = async (req, res) => {
  const { pname, pdes, skill, date } = req.body;

  const sql =
    "insert into projects(project_name,description,stack,expiry_date,status_id)values(?,?,?,?,1)";

  db.query(sql, [pname, pdes, skill, date], (err, result) => {
    if (err) {
      res.json({ msg: "db_error" });
      console.log(err);
    } else {
      res.json({ msg: "added" });
    }
  });
};

const skillBasedProjects = async (req, res) => {
  const { id } = req.params;

  const sql = `SELECT p.project_id, p.project_name, p.description, p.expiry_date, p.created_at
  FROM projects p
  JOIN student_skills ss ON p.stack = ss.skill_id
  WHERE ss.student_id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ msg: "db_error" });
    } else {
      res.json({ result });
    }
  });
};

const studentBitInfo = async (req, res) => {
  const { stu_id, pro_id } = req.body;

  const sql = `INSERT INTO bit (student_id, project_id) VALUES(?,?)`;

  db.query(sql, [stu_id, pro_id], (err, result) => {
    if (err) {
      res.send("query_error");
    } else {
      res.send("bit_added");
    }
  });
};

const getAllProjects = async (req, res) => {
  const sql = `SELECT 
  p.project_id,
  p.project_name,
  p.description,
  p.stack,
  p.created_at,
  p.expiry_date,
  COUNT(b.bit_id) AS bit_count
FROM 
  projects p
LEFT JOIN 
  bit b ON p.project_id = b.project_id
GROUP BY 
  p.project_id, p.project_name;`;

  db.query(sql, (err, result) => {
    if (err) {
      res.send("db_error");
    } else {
      res.send(result);
    }
  });
};

const getBitInfo = async (req, res) => {
  const sql = `SELECT project_id, COUNT(*) AS count
  FROM bit
  GROUP BY project_id;`;

  db.query(sql, (err, result) => {
    if (err) {
      res.send("db_error");
    } else {
      res.send(result);
    }
  });
};

const bittedInfo = async (req, res) => {
  const { id } = req.params;

  const sql = `SELECT p.project_id,p.project_name,b.bit_id, b.student_id, s.name AS student_name, s.college_id, c.college_name, b.datetime, b.bit_status_id
  FROM projects p
  JOIN bit b ON p.project_id = b.project_id
  JOIN students s ON b.student_id = s.student_id
  JOIN colleges c ON s.college_id = c.college_id
  WHERE p.project_id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send("db_error");
    } else {
      res.send(result);
    }
  });
};

export {
  studentsData,
  studentsCount,
  filterCollegeStduents,
  filterStudentSkills,
  addProjects,
  skillBasedProjects,
  studentBitInfo,
  getAllProjects,
  getBitInfo,
  bittedInfo,
};
