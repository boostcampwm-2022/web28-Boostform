import React, { useEffect, useState } from "react";
import Icon from "components/common/Icon";
import IconButton from "components/common/IconButton";
import theme from "styles/theme";
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
            <IconButton type="button" onClick={() => onClickSelectOption(value)} icon="checkboxEmpty" size="20px" />
          )}
          {selected === value && (
            <IconButton
              type="button"
              onClick={() => onClickDeselectOption()}
              icon="checkboxFull"
              size="20px"
              fill={theme.colors.blue3}
            />
          )}
          <S.Option>{value}</S.Option>
        </S.ObjectiveWrapper>
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

export default Checkbox;
