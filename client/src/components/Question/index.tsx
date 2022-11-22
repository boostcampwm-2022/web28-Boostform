import React from "react";
import Checkbox from "./Checkbox";

interface QuestionState {
  questionId: number;
  page: number;
  type: "checkbox" | "multiple" | "paragraph";
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: string[];
}

function Question({
  index,
  questionState,
  addQuestionChoice,
  modifyChoice,
}: {
  index: number;
  questionState: QuestionState;
  addQuestionChoice: (idx: number) => void;
  modifyChoice: (questionIndex: number, choiceIndex: number, value: string) => void;
}) {
  const { type } = questionState;
  return (
    <>
      {type === "checkbox" && (
        <Checkbox
          questionState={questionState}
          addQuestionChoice={addQuestionChoice}
          modifyChoice={modifyChoice}
          index={index}
        />
      )}
      {type === "multiple" && <div>multiple</div>}
      {type === "paragraph" && <div>paragraph</div>}
    </>
  );
}

export default Question;
