import React from "react";
import Icon from "components/common/Icon";
import IconButton from "components/common/IconButton";
import TextButton from "components/common/TextButton";
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
          <TextButton
            type="button"
            color={theme.colors.grey5}
            fontSize={theme.fontSize.sz14}
            onClick={() => addQuestionChoice(index)}
            style={{ paddingLeft: "2px" }}
          >
            옵션 추가
          </TextButton>
        </S.AddOptionWrapper>
      </S.ChoiceWrapper>
    </div>
  );
}

export default Objective;
