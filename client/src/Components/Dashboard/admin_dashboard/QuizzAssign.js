import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./quizAssigning.module.css";

function QuizAssign() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [availableQuestions, setAvailableQuestions] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [quizDes, setQuizDes] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [easyPassMark, setEasyPassMark] = useState(0);
  const [mediumPassMark, setMediumPassMark] = useState(0);

  useEffect(() => {
    // Fetch categories from the backend
    axios
      .get("http://localhost:5000/admin/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch available question count for the selected category
    if (selectedCategoryId) {
      axios
        .get(
          `http://localhost:5000/admin/questions/count?category_id=${selectedCategoryId}`
        )
        .then((response) => {
          setAvailableQuestions(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching question count:", error);
        });
    }
  }, [selectedCategoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      quiz_name: quizName,
      quiz_des: quizDes,
      category_id: selectedCategoryId,
      total_no_of_question: totalQuestions,
      difficulty_level_id: difficultyLevel,
      easy_pass_mark: easyPassMark,
      medium_pass_mark: difficultyLevel >= 2 ? mediumPassMark : null,
    };
    // console.log(data);

    axios
      .post("http://localhost:5000/admin/assign-test", data)
      .then((response) => {
        alert("Quiz assigned successfully");
        // Reset form fields
        setQuizName("");
        setQuizDes("");
        setSelectedCategoryId("");
        setTotalQuestions(0);
        setDifficultyLevel(1);
        setEasyPassMark(0);
        setMediumPassMark(0);
      })
      .catch((error) => {
        console.error("Error assigning quiz:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Assign New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Quiz Name</label>
          <input
            type="text"
            className={styles.formControl}
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Quiz Description</label>
          <textarea
            className={styles.formControl}
            value={quizDes}
            onChange={(e) => setQuizDes(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            className={styles.formControl}
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>
            Total Number of Questions (Available: {availableQuestions})
          </label>
          <input
            type="number"
            className={styles.formControl}
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
            max={availableQuestions}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Difficulty Level</label>
          <select
            className={styles.formControl}
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}
            required
          >
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
        </div>

        {/* Conditionally render pass mark fields */}
        {difficultyLevel >= 1 && (
          <div className={styles.formGroup}>
            <label>Easy Pass Mark</label>
            <input
              type="number"
              className={styles.formControl}
              value={easyPassMark}
              onChange={(e) => setEasyPassMark(e.target.value)}
              required
            />
          </div>
        )}
        {difficultyLevel >= 2 && (
          <div className={styles.formGroup}>
            <label>Medium Pass Mark</label>
            <input
              type="number"
              className={styles.formControl}
              value={mediumPassMark}
              onChange={(e) => setMediumPassMark(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className={styles.btn}>
          Assign Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizAssign;




// QuizAssign Component
// This component allows an admin to assign a quiz with the following features:

// Quiz Name and Description.
// Category Selection: Shows category names and fetches available question counts.
// Total Number of Questions: Limited to available questions in the selected category.
// Difficulty Level: Choice among Easy, Medium, and Hard.
// Conditional Pass Mark Inputs: Displayed based on the selected difficulty level.