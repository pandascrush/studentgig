import React, { useEffect, useState } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./FrontPage.module.css";
import { Link, useParams } from "react-router-dom";
import { ContextUser } from "../Context/context";

function Land() {
  const { id } = useParams();
  const decoded = atob(id);
  const [name, setName] = useState(""); // State to store the user's name
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [quizAttempts, setQuizAttempts] = useState(null); // State to store quiz_attempts

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Fetch quiz_attempts value when the component loads
    axios
      .get(`http://localhost:5000/stu/getdata/${decoded}`)
      .then((response) => {
        // console.log(response.data.msg[0].quiz_attempts);
        setQuizAttempts(response.data.msg[0].quiz_attempts);
      })
      .catch((error) => {
        console.error("Error fetching quiz attempts:", error);
      });
  }, [decoded]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className={styles.landImage}>
        {submitted ? (
          <Quizzes />
        ) : (
          <div className="container text-center mt-5">
            <h1 className="mb-4">Quiz</h1>
            <p className="text-left">
              Participants have 30 minutes to complete the quiz. The quiz
              includes multiple choice, true/false, and short answer questions;
              participants can navigate between questions using 'Next' and
              'Previous' buttons. Click 'Submit' after answering all questions;
              if the time limit is reached, the quiz will be automatically
              submitted with the answers provided up to that point. Each correct
              answer is worth one point; results will be available immediately
              after submission. Participants must complete the quiz without
              external assistance; any form of cheating will result in
              disqualification.
            </p>
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              Start Quiz
            </button>
            {quizAttempts > 0 ? (
              <Link
                to={`/student/${id}`}
                className="btn btn-secondary mt-3 ml-3"
              >
                Go to Profile
              </Link>
            ) : (
              <button className="btn btn-secondary mt-3 ml-3" disabled>
                Go to Profile
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Land;
