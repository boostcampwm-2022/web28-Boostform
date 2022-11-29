import React from "react";
import Checkbox from "./Checkbox";
import Multiple from "./Multiple";
import Paragraph from "./Paragraph";
import { QuestionViewProps } from "./type";

function QuestionView({
  questionState,
  addResponse,
  deleteResponse,
  editResponse,
  responseState,
  validationMode,
  validation,
  setValidation,
}: QuestionViewProps) {
  const { type } = questionState;
  return (
    <>
      {type === "checkbox" && (
        <Checkbox
          questionState={questionState}
          addResponse={addResponse}
          deleteResponse={deleteResponse}
          editResponse={editResponse}
          responseState={responseState}
          validationMode={validationMode}
          validation={validation}
          setValidation={setValidation}
        />
      )}
      {type === "multiple" && (
        <Multiple
          questionState={questionState}
          addResponse={addResponse}
          deleteResponse={deleteResponse}
          editResponse={editResponse}
          responseState={responseState}
          validationMode={validationMode}
          validation={validation}
          setValidation={setValidation}
        />
      )}
      {type === "paragraph" && (
        <Paragraph
          questionState={questionState}
          addResponse={addResponse}
          deleteResponse={deleteResponse}
          editResponse={editResponse}
          responseState={responseState}
          validationMode={validationMode}
          validation={validation}
          setValidation={setValidation}
        />
      )}
    </>
  );
}

export default QuestionView;
