import React, { useEffect, useState } from "react";
import Icon from "components/Icon";
import { QuestionViewProps } from "../type";
import * as S from "./style";

function Checkbox({
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
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const selection =
      responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer[0] || null;
    setSelected(selection);
  }, [responseState, questionId]);

  const onClickSelectOption = (value: string) => {
    if (selected) editResponse(questionId, [value]);
    else addResponse({ questionId, answer: [value] });
    setSelected(value);
    setValidation((prev) => {
      if (essential) return { ...prev, [questionId]: true };
      return prev;
    });
  };

  const onClickDeselectOption = () => {
    setSelected(null);
    deleteResponse(questionId);
    setValidation((prev) => {
      if (essential) return { ...prev, [questionId]: false };
      return prev;
    });
  };

  return (
    <S.Container>
      {option.map(({ choiceId, value }) => (
        <S.ObjectiveWrapper key={choiceId}>
          {selected !== value && (
            <S.CheckIconButton type="button" onClick={() => onClickSelectOption(value)}>
              <Icon type="checkboxEmpty" size="20px" />
            </S.CheckIconButton>
          )}
          {selected === value && (
            <S.CheckIconButton type="button" onClick={() => onClickDeselectOption()}>
              <Icon type="checkboxFull" size="20px" fill="#3c64b1" />
            </S.CheckIconButton>
          )}
          <S.Option>{value}</S.Option>
        </S.ObjectiveWrapper>
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

export default Checkbox;
