import React from "react";
import { QuestionState } from "types/form.type";
import Checkbox from "./Checkbox";
import Multiple from "./Multiple";
import Paragraph from "./Paragraph";

function QuestionView({ questionState }: { questionState: QuestionState }) {
  const { type } = questionState;
  return (
    <>
      {type === "checkbox" && <Checkbox questionState={questionState} />}
      {type === "multiple" && <Multiple questionState={questionState} />}
      {type === "paragraph" && <Paragraph />}
    </>
  );
}

export default QuestionView;
