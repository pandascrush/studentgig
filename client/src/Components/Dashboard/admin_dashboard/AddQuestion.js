// AddQuestion.js
import React, { useState } from "react";
import axios from "axios";
import styles from "./addQuestion.module.css";

function AddQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [difficultyLevelId, setDifficultyLevelId] = useState(1);
  const [categoryId, setCategoryId] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      question_text: questionText,
      correct_answer: correctAnswer,
      options: options,
      difficulty_level_id: difficultyLevelId,
      category_id: categoryId ? parseInt(categoryId) : null,
    };

    axios
      .post("http://localhost:5000/admin/add-question", data)
      .then((response) => {
        console.log("Question added successfully:", response.data);
        // Reset form
        setQuestionText("");
        setCorrectAnswer("");
        setOptions(["", "", "", ""]);
        setDifficultyLevelId(1);
        setCategoryId("");
        if (response.data.message === "Question added successfully") {
          alert("Question Added Successfully");
        }
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Question Text</label>
          <textarea
            className={styles.formControl}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Correct Answer</label>
          <input
            type="text"
            className={styles.formControl}
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              className={styles.formControl}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <div className={styles.formGroup}>
          <label>Difficulty Level</label>
          <select
            className={styles.formControl}
            value={difficultyLevelId}
            onChange={(e) => setDifficultyLevelId(parseInt(e.target.value))}
            required
          >
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Category ID</label>
          <input
            type="number"
            className={styles.formControl}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;
