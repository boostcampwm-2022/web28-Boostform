import React from "react";
import Checkbox from "./Checkbox";
import Paragraph from "./Paragraph";

interface QuestionState {
  questionId: number;
  page: number;
  type: "checkbox" | "multiple" | "paragraph";
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: {
    choiceId: number;
    value: string;
  }[];
}

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
