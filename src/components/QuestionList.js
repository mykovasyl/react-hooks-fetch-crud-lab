import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onQuestionDelete, onQuestionUpdate }) {
  const questionsToDisplay = questions.map((question) => (
    <QuestionItem
      key={question.id}
      id={question.id}
      prompt={question.prompt}
      answers={question.answers}
      correctIndex={question.correctIndex}
      onQuestionDelete={onQuestionDelete}
      onQuestionUpdate={onQuestionUpdate}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToDisplay}</ul>
    </section>
  );
}

export default QuestionList;
