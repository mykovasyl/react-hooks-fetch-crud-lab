import React from "react";

function QuestionItem({
  id,
  prompt,
  answers,
  correctIndex,
  onQuestionDelete,
  onQuestionUpdate,
}) {
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    onQuestionDelete(id);
  }

  function handleChange(e) {
    const newIndex = e.target.value;
    onQuestionUpdate(id, newIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
