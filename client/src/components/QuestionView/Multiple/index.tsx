import React, { useState } from "react";
import Icon from "components/Icon";
import QuestionViewProps from "../type";
import * as S from "./style";

function Multiple({ questionState, addResponse, deleteResponse, editResponse, responseState }: QuestionViewProps) {
  const { option, questionId } = questionState;
  const selection =
    responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer || [];
  const [selected, setSelected] = useState<string[]>(selection);

  const onClickSelectOption = (value: string) => {
    if (selected.length) editResponse(questionId, [...selected, value]);
    else addResponse({ questionId, answer: [value] });
    setSelected((prev) => [...prev, value]);
  };

  const onClickDeselectOption = (value: string) => {
    if (selected.length === 1) deleteResponse(questionId);
    else
      editResponse(
        questionId,
        selected.filter((v) => v !== value)
      );
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
    </S.Container>
  );
}

export default Multiple;
