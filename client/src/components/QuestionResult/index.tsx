import React from "react";
import Checkbox from "./Checkbox";
import Multiple from "./Multiple";
import Paragraph from "./Paragraph";
import QuestionResultProps from "./type";

function QuestionResult({ type, answerTotal }: QuestionResultProps) {
  return (
    <>
      {type === "checkbox" && <Checkbox answerTotal={answerTotal} />}
      {type === "multiple" && <Multiple answerTotal={answerTotal} />}
      {type === "paragraph" && <Paragraph answerTotal={answerTotal} />}
    </>
  );
}

export default QuestionResult;
