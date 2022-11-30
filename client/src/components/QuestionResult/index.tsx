import React from "react";
import { QuestionType } from "types/form.type";
import { AnswerTotal } from "types/result";
import Checkbox from "./Checkbox";
import Multiple from "./Multiple";
import Paragraph from "./Paragraph";

function QuestionResult({ type, answerTotal }: { type: QuestionType; answerTotal: AnswerTotal }) {
  return (
    <>
      {type === "checkbox" && <Checkbox answerTotal={answerTotal} />}
      {type === "multiple" && <Multiple answerTotal={answerTotal} />}
      {type === "paragraph" && <Paragraph answerTotal={answerTotal} />}
    </>
  );
}

export default QuestionResult;
