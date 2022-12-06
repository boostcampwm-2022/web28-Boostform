import React from "react";
import Icon from "components/Icon";
import IconButton from "components/atoms/IconButton";
import theme from "styles/theme";
import * as S from "./style";
import ObjectiveProps from "./type";

function Objective({ index, questionState, addQuestionChoice, modifyChoice, deleteChoice }: ObjectiveProps) {
  const { option, type } = questionState;

  return (
    <div>
      {option.map(({ choiceId, value }, choiceIndex) => (
        <S.ChoiceWrapper key={choiceId}>
          {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill={theme.colors.grey3} />}
          {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill={theme.colors.grey3} />}
          <S.Input value={value} onInput={(e) => modifyChoice(index, choiceIndex, e.currentTarget.value)} />
          {questionState.option.length > 1 && (
            <IconButton type="button" onClick={() => deleteChoice(index, choiceIndex)} icon="close" size="16px" />
          )}
        </S.ChoiceWrapper>
      ))}
      <S.ChoiceWrapper>
        {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill={theme.colors.grey3} />}
        {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill={theme.colors.grey3} />}
        <S.AddOptionWrapper>
          <S.AddOptionButton type="button" onClick={() => addQuestionChoice(index)}>
            옵션 추가
          </S.AddOptionButton>
        </S.AddOptionWrapper>
      </S.ChoiceWrapper>
    </div>
  );
}

export default Objective;
