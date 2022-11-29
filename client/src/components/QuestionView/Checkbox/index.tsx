import React, { useState } from "react";
import Icon from "components/Icon";
import QuestionViewProps from "../type";
import * as S from "./style";

function Checkbox({ questionState, addResponse, deleteResponse, editResponse, responseState }: QuestionViewProps) {
  const { option, questionId } = questionState;
  const selection =
    responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer[0] || null;
  const [selected, setSelected] = useState<string | null>(selection);

  const onClickSelectOption = (value: string) => {
    if (selected) editResponse(questionId, [value]);
    else addResponse({ questionId, answer: [value] });
    setSelected(value);
  };

  const onClickDeselectOption = () => {
    setSelected(null);
    deleteResponse(questionId);
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
    </S.Container>
  );
}

export default Checkbox;
