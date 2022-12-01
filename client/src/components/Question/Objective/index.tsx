import React from "react";
import Icon from "components/Icon";
import { ChoiceWrapper, Input, DeleteButton, AddOptionWrapper, AddOptionButton } from "./style";
import ObjectiveProps from "./type";

function Objective({ index, questionState, addQuestionChoice, modifyChoice, deleteChoice }: ObjectiveProps) {
  const { option, type } = questionState;

  return (
    <div>
      {option.map(({ choiceId, value }, choiceIndex) => (
        <ChoiceWrapper key={choiceId}>
          {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />}
          {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill="#aeaeae" />}
          <Input value={value} onInput={(e) => modifyChoice(index, choiceIndex, e.currentTarget.value)} />
          {questionState.option.length > 1 && (
            <DeleteButton type="button" onClick={() => deleteChoice(index, choiceIndex)}>
              <Icon type="close" size="16px" />
            </DeleteButton>
          )}
        </ChoiceWrapper>
      ))}
      <ChoiceWrapper>
        {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />}
        {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill="#aeaeae" />}
        <AddOptionWrapper>
          <AddOptionButton type="button" onClick={() => addQuestionChoice(index)}>
            옵션 추가
          </AddOptionButton>
        </AddOptionWrapper>
      </ChoiceWrapper>
    </div>
  );
}

export default Objective;
