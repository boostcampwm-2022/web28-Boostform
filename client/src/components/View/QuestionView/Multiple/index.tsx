import React, { useEffect, useState } from "react";
import Icon from "components/common/Icon";
import IconButton from "components/common/IconButton";
import theme from "styles/theme";
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
            <IconButton type="button" onClick={() => onClickSelectOption(value)} icon="multipleEmpty" size="20px" />
          )}
          {selected.includes(value) && (
            <IconButton
              type="button"
              onClick={() => onClickDeselectOption(value)}
              icon="multipleFull"
              size="20px"
              fill={theme.colors.blue3}
            />
          )}
          <S.Option>{value}</S.Option>
        </S.MultipleWrapper>
      ))}
      {validationMode && !validation[questionId] && essential && (
        <S.VaidationWrapper>
          <Icon type="error" size="16px" fill={theme.colors.red1} />
          <S.ValidationText>필수 질문입니다!</S.ValidationText>
        </S.VaidationWrapper>
      )}
    </S.Container>
  );
}

export default Multiple;
