import React from "react";
import { QuestionState } from "types/form.type";
import Checkbox from "./Checkbox";
import Paragraph from "./Paragraph";

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
        <Checkbox
          questionState={questionState}
          addQuestionChoice={addQuestionChoice}
          modifyChoice={modifyChoice}
          deleteChoice={deleteChoice}
          index={index}
        />
      )}

      {type === "paragraph" && <Paragraph />}
    </>
  );
}

export default Question;
