import db from "../config/db.js";
import path from "path";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

  try {
    const checkEmailQuery =
      "SELECT COUNT(*) AS count FROM students WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, result) => {
      if (err) {
        res.send("db_error");
      } else {
        if (result[0].count > 0) {
          return res.status(200).send("Email already exists");
        } else {
          let registrationsql =
            "insert into students(name,email,password,degree,year,specialization,college_id,role_id)values(?,?,?,?,?,?,?,1)";
          db.query(
            registrationsql,
            [
              name,
              email,
              password,
              selectedCollege,
              year,
              skill,
              selectedCategory,
            ],
            (error, result) => {
              if (error) {
                console.log("error", error);
                res.json({ status: "error" });
              } else {
                res.json({ status: "inserted" });
              }
            }
          );
        }
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const StudentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
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
          const token = jwt.sign({ user: id }, "secretkey", {
            expiresIn: "1d",
          });
          res.cookie("accessToken", token, { httpOnly: true, sameSite: true });
          res.json({ status: "user", id: id, role: role, name: name });
        } else {
          res.json({ msg: "invalid_password" });
        }
      } else {
        res.json({ msg: "not_a_user" });
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const GetSingleStudentData = async (req, res) => {
  const { student_id } = req.params;

  try {
    let getdata = "select * from students where student_id=?";
    db.query(getdata, [student_id], (error, result) => {
      if (error) {
        res.json({ msg: "error", status: false });
      } else {
        res.json({ status: true, msg: result });
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const profileUpdation = async (req, res) => {
  const { id, git, des, url, skill } = req.body;
  const file = req.file;

  // Check if file is not uploaded
  if (!file || !file.path) {
    console.log("No resume file uploaded. Continuing without resume.");
  } else {
    // Retrieve file metadata
    const file1Filename = file.originalname;
    const file1Path = file.path;
  }

  try {
    // Update student with GitHub link and resume file path
    const sqlUpdateStudent =
      "UPDATE students SET github_link=? WHERE student_id=?";
    db.query(sqlUpdateStudent, [git, id], (err, result) => {
      if (err) {
        console.error("Error updating student in the database: ", err);
        return res.status(500).send("Internal server error_db");
      }

      // Check if skill already exists for this student
      const sqlCheckSkill =
        "SELECT * FROM student_skills WHERE student_id=? AND skill_id=?";
      db.query(sqlCheckSkill, [id, skill], (err, results) => {
        if (err) {
          console.error("Error checking skills in the database: ", err);
          return res.status(500).send("Internal server error");
        }

        if (results.length > 0) {
          // Entry already exists
          return res.status(400).send("Skill_already_exists_for_this_student");
        } else {
          // Insert new skill for the student
          const sqlInsertSkill =
            "INSERT INTO student_skills(student_id, skill_id, skill_url, skill_description) VALUES (?, ?, ?, ?)";
          db.query(sqlInsertSkill, [id, skill, url, des], (err, result) => {
            if (err) {
              console.error("Error inserting skill into the database: ", err);
              return res.status(500).json({ status: "error" });
            }

            res.status(200).send("Profile updated successfully");
          });
        }
      });
    });
  } catch (e) {
    console.error("Error in profile updation: ", e);
    res.status(500).json({ msg: "student_catch_error" });
  }
};

const updateUserData = async (req, res) => {
  const { Name, Email, Password, Degree, Year, Spl, coll, id } = req.body;

  let Filename = null;
  let Pathname = null;
  try {
    if (req.file) {
      Filename = req.file.filename;
      Pathname = req.file.path;
    }

    let sql =
      "UPDATE students SET name=?, email=?, password=?, degree=?, year=?, specialization=?, college_id=?";
    let values = [Name, Email, Password, Degree, Year, Spl, coll];

    // If a file is provided, include the profile_photo field in the update statement
    if (Filename) {
      sql += ", profile_photo=?";
      values.push(Filename);
    }

    sql += " WHERE student_id=?";
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("error", err);
        res.json({ status: false, msg: "error" });
      } else {
        res.json({ status: true, msg: "updated" });
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const getSingleProfile = async (req, res) => {
  const { id } = req.params;

  try {
    let sql = "select * from students where student_id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log("error");
        res.send(err);
      } else {
        var photo = result[0].profile_photo;
        // photo = "https://iconape.com/wp-content/png_logo_vector/avatar-4.png";
        photo = "hi";

        const __dirname = path.resolve();
        // res.sendFile(path.join(__dirname, photo));
        let img = path.join(__dirname, photo);
        res.send({ result, img });
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const getStudentSkills = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `SELECT 
  s.skill_name
FROM 
  skills s
JOIN 
  student_skills ss
ON 
  s.skill_id = ss.skill_id
WHERE 
  ss.student_id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const ForgotPassword = async (req, res) => {
  const { Email } = req.body;
  //console.log(Email);

  try {
    const sql = `SELECT * FROM students WHERE email = ?`;
    db.query(sql, [Email], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        const id = result[0].student_id;
        const token = jwt.sign({ id: id }, "secretkey", {
          expiresIn: "5m",
        });

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sivaranji5670@gmail.com",
            pass: "zicd vrfo zxbs jsfb ",
          },
        });

        const text = `http://localhost:3000/reset/${token}`;

        var mailOptions = {
          from: "sivaranji5670@gmail.com",
          to: Email,
          subject: "Regarding Reset Password",
          html: `<h1>Reset Password Link</h1>
        <p>Password reset refers to the process of changing or recovering a forgotten password for a user account in an organization's system</p>
        <h2>${text}</h2>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.send("mail_sended");
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { Password } = req.body;

  try {
    const verified = jwt.verify(token, "secretkey");
    const userId = verified.id;

    const sql = `UPDATE students
  SET password = ?
  WHERE student_id = ?`;
    db.query(sql, [Password, userId], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("password_updated");
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const StudentProjectDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `
  SELECT 
  p.project_id, 
  p.project_name, 
  p.description AS project_description, 
  p.status_id, 
  p.created_at, 
  p.expiry_date,
  s.skill_id, 
  s.skill_name
FROM 
  projects p
LEFT JOIN 
  skills s ON p.stack = s.skill_id
WHERE 
  p.project_id = ?;
  `;

    db.query(sql, [id], (err, result) => {
      if (err) {
        res.send("db_error");
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    res.send("student_catch_error");
  }
};

const QuizzResults = async (req, res) => {
  try {
    const { student_name,totalScore, quiz_attempts, questions, student_id } = req.body;

    // Update student's quiz attempts count
    db.query(
      `UPDATE students SET quiz_attempts = quiz_attempts + ? WHERE student_id = ?`,
      [quiz_attempts, student_id],
      (err, studentResult) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error updating student quiz attempts");
        }

        // Calculate scores for each difficulty level
        let easyScore = 0;
        let mediumScore = 0;
        let hardScore = 0;

        questions.forEach((q) => {
          if (q.difficulty_level_id === 1 && q.is_correct) {
            easyScore++;
          } else if (q.difficulty_level_id === 2 && q.is_correct) {
            mediumScore++;
          } else if (q.difficulty_level_id === 3 && q.is_correct) {
            hardScore++;
          }
        });

        // Insert quiz attempt
        db.query(
          `INSERT INTO quizattempts (student_id, quiz_score) VALUES (?, ?)`,
          [student_id, totalScore],
          (err, quizResult) => {
            if (err) {
              return res.status(500).send("Error inserting quiz attempt");
            }

            const attempt_id = quizResult.insertId;

            // Insert each question attempt
            const questionAttempts = questions.map((q) => [
              student_id,
              q.question_id,
              q.chosen_option,
              q.is_correct,
              1, // Assuming encounter_count starts at 1
              attempt_id,
            ]);

            db.query(
              `INSERT INTO studentquestionattempts (student_id, question_id, chosen_option, is_correct, encounter_count, attempt_id) VALUES ?`,
              [questionAttempts],
              (err) => {
                if (err) {
                  return res
                    .status(500)
                    .send("Error inserting question attempts");
                }

                // Send the total score in the response
                res.json({
                  message: "Quiz data submitted successfully",
                  totalScore,
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error("Error in QuizzResults:", error);
    res.status(500).send("Internal Server Error");
  }
};

const studentDifficulty = async (req, res) => {
  const level = req.query.level;
  db.query(
    "SELECT question_id, question_text, difficulty_level_id, options, correct_answer FROM questions WHERE difficulty_level_id = ? LIMIT 10",
    [level],
    (err, results) => {
      if (err) {
        console.error("Error fetching questions:", err);
        return res.status(500).send("Error fetching questions");
      }
      res.json(results);
    }
  );
};

const studentOptionClick = async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;

    // Fetch correct answer from the database
    const query =
      "SELECT correct_answer, difficulty_level_id FROM questions WHERE question_id = ?";
    db.query(query, [questionId], (err, result) => {
      if (err) {
        console.error("Error fetching correct answer:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }

      const { correct_answer, difficulty_level_id } = result[0];
      const isCorrect = selectedOption === correct_answer;
      const difficultyLevel = difficulty_level_id;
      
      // Send response indicating whether the selected option is correct and the difficulty level
      res.json({ isCorrect, difficultyLevel });
    });
  } catch (error) {
    console.error("Error handling option click:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Verify = async (req, res) => {
  res.json({ status: true, msg: "authorized" });
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.json({ status: true, msg: "logout" });
  } catch (e) {
    res.send("student_catch_error");
  }
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
  getStudentSkills,
  ForgotPassword,
  ResetPassword,
  StudentProjectDetails,
  QuizzResults,
  studentDifficulty,
  studentOptionClick,
};
