import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./addQuestion.module.css";

function AddQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [difficultyLevelId, setDifficultyLevelId] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories and subcategories from the database
    axios.get("http://localhost:5000/admin/categories-and-subcategories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories and subcategories:", error);
      });
  }, []);

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
      sub_category_id: subCategoryId ? parseInt(subCategoryId) : null,
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
        setSubCategoryId("");
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
          <label>Category</label>
          <select
            className={styles.formControl}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        {categoryId && (
          <div className={styles.formGroup}>
            <label>Subcategory</label>
            <select
              className={styles.formControl}
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
              required
            >
              <option value="">Select a subcategory</option>
              {categories
                .find((cat) => cat.category_id === parseInt(categoryId))
                ?.subcategories.map((subCategory) => (
                  <option key={subCategory.sub_category_id} value={subCategory.sub_category_id}>
                    {subCategory.sub_category_name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <button type="submit" className={styles.btn}>
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;
