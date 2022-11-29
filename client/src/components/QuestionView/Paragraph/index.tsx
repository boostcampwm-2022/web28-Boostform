import React from "react";
import QuestionViewProps from "../type";
import ParagraphInput from "./style";

function Paragraph({ questionState, addResponse, deleteResponse, editResponse, responseState }: QuestionViewProps) {
  const { questionId } = questionState;
  const selection =
    responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer[0] || null;

  const onInputEditAnswer: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    if (!value) deleteResponse(questionId);
    if (value.length === 1) addResponse({ questionId, answer: [value] });
    else editResponse(questionId, [value]);
  };

  return <ParagraphInput placeholder="내 답변" defaultValue={selection || ""} onInput={onInputEditAnswer} />;
}

export default Paragraph;
