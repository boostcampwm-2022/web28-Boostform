import React from "react";
import { QuestionState } from "types/form.type";
import Objective from "./Objective";
import Subjective from "./Subjective";

function QuestionRead({ questionState }: { questionState: QuestionState }) {
  const { type } = questionState;
  return (
    <>
      {(type === "checkbox" || type === "multiple") && <Objective questionState={questionState} />}

      {type === "paragraph" && <Subjective />}
    </>
  );
}

export default QuestionRead;
