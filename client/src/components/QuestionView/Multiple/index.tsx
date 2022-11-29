import React, { useEffect, useState } from "react";
import Icon from "components/Icon";
import { QuestionViewProps } from "../type";
import * as S from "./style";

function Multiple({
  questionState,
  addResponse,
  deleteResponse,
  editResponse,
  responseState,
  validationMode,
  validation,
  setValidation,
}: QuestionViewProps) {
  const { option, questionId, essential } = questionState;
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const selection =
      responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer || [];
    setSelected(selection);
  }, [responseState, questionId]);

  const onClickSelectOption = (value: string) => {
    if (selected.length) editResponse(questionId, [...selected, value]);
    else addResponse({ questionId, answer: [value] });
    setSelected((prev) => [...prev, value]);
    setValidation((prev) => {
      if (essential) return { ...prev, [questionId]: true };
      return prev;
    });
  };

  const onClickDeselectOption = (value: string) => {
    if (selected.length === 1) {
      deleteResponse(questionId);
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: false };
        return prev;
      });
    } else {
      const changedResponse = selected.filter((v) => v !== value);
      editResponse(questionId, changedResponse);
    }

    setSelected((prev) => prev.filter((v) => v !== value));
  };

  return (
    <S.Container>
      {option.map(({ choiceId, value }) => (
        <S.MultipleWrapper key={choiceId}>
          {!selected.includes(value) && (
            <S.MultipleIconButton type="button" onClick={() => onClickSelectOption(value)}>
              <Icon type="multipleEmpty" size="20px" />
            </S.MultipleIconButton>
          )}
          {selected.includes(value) && (
            <S.MultipleIconButton type="button" onClick={() => onClickDeselectOption(value)}>
              <Icon type="multipleFull" size="20px" fill="#3c64b1" />
            </S.MultipleIconButton>
          )}
          <S.Option>{value}</S.Option>
        </S.MultipleWrapper>
      ))}
      {validationMode && !validation[questionId] && essential && (
        <S.VaidationWrapper>
          <Icon type="error" size="16px" fill="#d93025" />
          <S.ValidationText>필수 질문입니다!</S.ValidationText>
        </S.VaidationWrapper>
      )}
    </S.Container>
  );
}

export default Multiple;
