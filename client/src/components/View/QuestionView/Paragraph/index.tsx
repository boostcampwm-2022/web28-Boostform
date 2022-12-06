import Icon from "components/common/Icon";
import React from "react";
import theme from "styles/theme";
import { QuestionViewProps } from "../type";
import * as S from "./style";

function Paragraph({
  questionState,
  addResponse,
  deleteResponse,
  editResponse,
  responseState,
  validationMode,
  validation,
  setValidation,
}: QuestionViewProps) {
  const { questionId, essential } = questionState;
  const selection =
    responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer[0] || null;

  const onInputEditAnswer: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      deleteResponse(questionId);
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: false };
        return prev;
      });
    } else if (value.length === 1) {
      addResponse({ questionId, answer: [value] });
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: true };
        return prev;
      });
    } else {
      editResponse(questionId, [value]);
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: true };
        return prev;
      });
    }
  };

  return (
    <>
      <S.ParagraphInput placeholder="내 답변" defaultValue={selection || ""} onInput={onInputEditAnswer} />
      {validationMode && !validation[questionId] && essential && (
        <S.VaidationWrapper>
          <Icon type="error" size="16px" fill={theme.colors.red1} />
          <S.ValidationText>필수 질문입니다!</S.ValidationText>
        </S.VaidationWrapper>
      )}
    </>
  );
}

export default Paragraph;
