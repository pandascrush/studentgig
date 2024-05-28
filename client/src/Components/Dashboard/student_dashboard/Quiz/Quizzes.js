import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Quizzes.module.css";
import { useParams, useHistory, Link } from "react-router-dom";

function Quizzes() {
  const { id, name } = useParams();
  const decoded = atob(id);
  const decodedName = atob(name);
  // const history = useHistory();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stu/questions")
      .then((res) => {
        const questionsWithParsedOptions = res.data.map((question) => ({
          ...question,
          options: JSON.parse(question.options),
        }));
        setQuestions(questionsWithParsedOptions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = () => {
    const data = {
      student_id: decoded,
      student_name: decodedName,
      quiz_attempts: 1,
      questions: questions.map((question) => ({
        question_id: question.question_id,
        chosen_option: selectedOptions[question.question_id] || null,
        is_correct:
          selectedOptions[question.question_id] === question.correct_answer,
        correct_answer: question.correct_answer,
      })),
    };

    axios
      .post("http://localhost:5000/stu/compare-and-submit", data)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        setQuizScore(response.data.quizScore);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  // const handleNavigate = () => {
  //   history.push("/profile");
  // };

  if (isSubmitted) {
    return (
      <div className={styles.card}>
        <h1>Quiz Completed</h1>
        <p>
          Your score: {quizScore} / {questions.length}
        </p>
        <Link className={styles.button} to={`/student/${id}`}>
          Go to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {questions.length > 0 && (
        <>
          <h1 className={styles.question}>
            {questions[currentQuestionIndex].question_text}
          </h1>
          <ul className={styles.options}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index} className={styles.option}>
                <input
                  type="radio"
                  name={`question_${questions[currentQuestionIndex].question_id}`}
                  value={option}
                  onChange={() =>
                    handleOptionSelect(
                      questions[currentQuestionIndex].question_id,
                      option
                    )
                  }
                  checked={
                    selectedOptions[
                      questions[currentQuestionIndex].question_id
                    ] === option
                  }
                  className={styles.input}
                />
                <label>{option}</label>
              </li>
            ))}
          </ul>
          {currentQuestionIndex < questions.length - 1 ? (
            <button className={styles.button} onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Quizzes;
