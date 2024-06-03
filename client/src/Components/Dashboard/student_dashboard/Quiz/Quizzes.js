import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Qnew.css";

function Quizzes() {
  const { id, name } = useParams();
  const decoded = atob(id);
  const decodedName = atob(name);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  useEffect(() => {
    fetchQuestions(1); // Fetch easy level questions initially
  }, []);

  const fetchQuestions = (level) => {
    axios
      .get(`http://localhost:5000/stu/questions?level=${level}`)
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
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option,
    });

    axios
      .post("http://localhost:5000/stu/option-click", {
        questionId,
        selectedOption: option,
        correctAnswersCount,
      })
      .then((response) => {
        const { isCorrect, difficultyLevel } = response.data;
        console.log(difficultyLevel);
        
        if (difficultyLevel === 1) {
          if (isCorrect) {
            setEasyCount(easyCount + 1);
          }
        }
        if (difficultyLevel === 2 && easyCount >= 4) {
          if (isCorrect) {
            setMediumCount(mediumCount + 1);
          }
        }
        if (difficultyLevel === 3 && mediumCount >= 3) {
          if (isCorrect) {
            setHardCount(hardCount + 1);
          }
        }
      })
      .catch((error) => {
        console.error("Error handling option click:", error);
      });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (easyCount >= 4) {
        fetchQuestions(2);
      }
      if (mediumCount >= 3) {
        fetchQuestions(3);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const data = {
      student_id: decoded,
      student_name: decodedName,
      quiz_attempts: 1,
      totalScore : easyCount + mediumCount + hardCount,
      questions: questions.map((question) => ({
        question_id: question.question_id,
        chosen_option: selectedOptions[question.question_id] || null,
        difficulty_level_id: question.difficulty_level_id,
        is_correct:
          selectedOptions[question.question_id] === question.correct_answer,
        correct_answer: question.correct_answer,
      })),
    };

    axios
      .post("http://localhost:5000/stu/compare-and-submit", data)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        setQuizScore(response.data.totalScore);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  if (isSubmitted) {
    return (
      <div className="cardhold">
        <h1>Quiz Completed</h1>
        <p>
          Your score: {quizScore} / {questions.length}
        </p>
        <Link className="button2" to={`/student/${id}`}>
          Go to Profile
        </Link>
      </div>
    );
  }

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <>
      <div className="quizpage container-fluid m-0 p-0">
        <span></span>
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
          <div className="container-fluid text-center">
            <h1 className="mx-auto">ENTRY TEST</h1>
          </div>
        </nav>
        <div className="row d-flex justify-content-center mx-3">
          <div className="col-sm-9 col-md-8">
            <div className="quiz-container">
              <div>
                {currentQuestion && (
                  <>
                    <div className="droppic">
                      <p className="score">
                        Question{" "}
                        <span style={{ color: "#348ABA" }}>
                          {currentQuestionIndex + 1}
                        </span>
                        /{questions.length}
                      </p>
                    </div>
                    <p>
                      {currentQuestionIndex + 1}.{currentQuestion.question_text}
                    </p>
                    <div>
                      {currentQuestion.options.map((option, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question${currentQuestion.question_id}`} // Unique name for each question
                            id={`option${index}`}
                            value={option}
                            checked={
                              selectedOptions[currentQuestion.question_id] ===
                              option
                            }
                            onChange={() =>
                              handleOptionChange(
                                currentQuestion.question_id,
                                option
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`option${index}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-center">
                      {currentQuestionIndex > 0 && (
                        <input
                          type="button"
                          value="Previous"
                          className="btn btn-secondary m-2"
                          onClick={handlePrevious}
                        />
                      )}
                      {isLastQuestion && (
                        <input
                          type="button"
                          value="Submit"
                          className="btn btn-primary m-2"
                          onClick={handleSubmit}
                        />
                      )}
                      {!isLastQuestion && (
                        <input
                          type="button"
                          value="Next"
                          className="btn btn-info m-2 text-light"
                          onClick={handleNext}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizzes;
