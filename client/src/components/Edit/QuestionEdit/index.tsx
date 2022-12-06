import React from "react";
import Objective from "./Objective";
import Subjective from "./Subjective";
import QuestionProps from "./type";

function Question({ index, questionState, addQuestionChoice, modifyChoice, deleteChoice }: QuestionProps) {
  const { type } = questionState;
  return (
    <>
      {(type === "checkbox" || type === "multiple") && (
        <Objective
          questionState={questionState}
          addQuestionChoice={addQuestionChoice}
          modifyChoice={modifyChoice}
          deleteChoice={deleteChoice}
          index={index}
        />
      )}

      {type === "paragraph" && <Subjective />}
    </>
  );
}

export default Question;
