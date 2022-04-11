import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions(data);
        setIsLoaded(true);
      });
  }, []);

  function handleNewQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: [
          newQuestion.answer1,
          newQuestion.answer2,
          newQuestion.answer3,
          newQuestion.answer4,
        ],
        correctIndex: parseInt(newQuestion.correctIndex),
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions([...questions, data]);
      });
  }

  function handleDeletedQuestion(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() =>
        setQuestions(questions.filter((question) => question.id !== questionId))
      );
  }

  function handleUpdatedQuestion(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(newIndex),
      }),
    })
      .then((resp) => resp.json())
      .then((updatedQuestion) => handleAfterPatch(updatedQuestion));
  }

  function handleAfterPatch(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {!isLoaded ? (
        <h3>Loading...</h3>
      ) : page === "Form" ? (
        <QuestionForm onFormSubmit={handleNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onQuestionDelete={handleDeletedQuestion}
          onQuestionUpdate={handleUpdatedQuestion}
        />
      )}
    </main>
  );
}

export default App;
