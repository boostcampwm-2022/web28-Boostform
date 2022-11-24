import React from "react";
import { QuestionState } from "types/form.type";
import Objective from "./Objective";
import Subjective from "./Subjective";

function Question({
  index,
  questionState,
  addQuestionChoice,
  modifyChoice,
  deleteChoice,
}: {
  index: number;
  questionState: QuestionState;
  addQuestionChoice: (idx: number) => void;
  modifyChoice: (questionIndex: number, choiceIndex: number, value: string) => void;
  deleteChoice: (questionIndex: number, choiceIndex: number) => void;
}) {
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
